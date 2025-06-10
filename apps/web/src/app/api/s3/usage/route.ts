import { auth } from "@/lib/auth";
import { db } from "@repo/db";
import { S3 } from "@/lib/S3Client";
import {
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await db.user.findFirst({
      where: {
        email: session.user.email ?? "",
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "Please re-login to fix this issue" },
        { status: 401 }
      );
    }

    const userId = userData.userId;
    let isTruncated = true;
    let continuationToken;
    let totalSize = 0;
    let fileCount = 0;

    while (isTruncated) {
      const command = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET_NAME,
        Prefix: `${userId}/`,
        ContinuationToken: continuationToken,
      });

      const response = (await S3.send(command)) as ListObjectsV2CommandOutput;

      if (response.Contents) {
        for (const obj of response.Contents) {
          totalSize += obj.Size ?? 0;
          fileCount += 1;
        }
      }

      isTruncated = response.IsTruncated ?? false;
      continuationToken = response.NextContinuationToken;
    }

    const totalMB = (totalSize / 1024 ** 2).toFixed(2);

    return NextResponse.json({
      id: userId,
      totalUsageMB: totalMB,
      totalFiles: fileCount,
    });
  } catch (error) {
    console.error("Error calculating total usage:", error);
    return NextResponse.json(
      { error: "Failed to calculate storage usage" },
      { status: 500 }
    );
  }
}
