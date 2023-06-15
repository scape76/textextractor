import { S3Client } from "@aws-sdk/client-s3";

import S3 from "aws-sdk/clients/s3";

export const s3Client = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.AWS3_ACCESS,
  secretAccessKey: process.env.AWS3_SECRET,
  signatureVersion: "v4",
});