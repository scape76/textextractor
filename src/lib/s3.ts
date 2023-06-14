import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "eu-central-1",
  endpoint: "http://localhost:9000",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
  },
});