import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

export const S3 = new S3Client({
  region: "ap-south-1",
  endpoint: "https://s3.adnsys.eu.org",
  forcePathStyle: true,
});
