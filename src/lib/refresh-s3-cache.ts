"use server";

import { redis } from "@/lib/redis";
import { S3 } from "@/lib/S3Client";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function refreshS3Cache(userId: string) {
  let continuationToken;
  const documents: any[] = [];

  do {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: `${userId}/`,
      ContinuationToken: continuationToken,
    });

    const response = (await S3.send(command)) as ListObjectsV2CommandOutput;

    for (const obj of response.Contents || []) {
      const url = await getSignedUrl(
        S3,
        new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: obj.Key!,
        }),
        { expiresIn: 3600 }
      );

      documents.push({
        key: obj.Key,
        size: obj.Size,
        url,
      });
    }

    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : null;
  } while (continuationToken);

  await redis.set(`s3:documents:${userId}`, { documents }, { ex: 3600 });

  return documents;
}
