import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@repo/db";

const uploadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export async function POST(request: Request) {
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

    const body = await request.json();
    const validation = uploadRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { filename, contentType, size } = validation.data;

    function generateNewFilename(filename: string) {
      const cuid = createId();
      const dotIndex = filename.lastIndexOf(".");

      if (dotIndex === -1) {
        return `${filename}-${cuid}`;
      }

      const name = filename.substring(0, dotIndex);
      const extension = filename.substring(dotIndex);
      return `${name}-${cuid}${extension}`;
    }

    const uniqueKey = `${userData.id}/${generateNewFilename(filename)}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360,
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
