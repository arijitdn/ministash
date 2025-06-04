import { NextRequest, NextResponse } from "next/server";
import { S3 } from "@/lib/S3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new NextResponse("Missing key parameter", { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    const { Body, ContentType, ContentLength } = await S3.send(command);

    const filename = key.split("/").pop() || "file";

    return new NextResponse(Body as ReadableStream, {
      headers: {
        "Content-Type": ContentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": ContentLength?.toString() || "",
      },
    });
  } catch (err) {
    console.error("Download error:", err);
    return new NextResponse("File not found or error occurred", {
      status: 404,
    });
  }
}
