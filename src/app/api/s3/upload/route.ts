import { uploadImageSchema } from "@/lib/validations/upload";
import supabase from "@/lib/supabase-server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { s3Client } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";

const UPLOAD_MAX_FILE_SIZE = 500000; // 5MB

const getBucketName = () => {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("Bucket name is not provided");
  }

  return bucketName;
};

export async function POST(req: Request) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Not authorized", { status: 404 });
    }

    const json = await req.json();
    const { name } = uploadImageSchema.parse(json);

    const imageId = `${uuidv4()}-${name}`;

    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: getBucketName(),
      Key: imageId,
      Fields: {
        key: imageId,
      },
      Conditions: [
        ["starts-with", "$Content-Type", "image/"],
        ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
      ],
    });

    return new Response(JSON.stringify({ url, fields, imageId }), { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 522 });
    }

    return new Response(JSON.stringify({ success: 0 }), { status: 500 });
  }
}
