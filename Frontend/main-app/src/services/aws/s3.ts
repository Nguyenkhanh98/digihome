import { Env } from "@/configs";
import { S3 } from "aws-sdk";
const S3_BUCKET_NAME = "digihome-model-public";
const REGION = "ap-southeast-1";

const s3 = new S3({
  region: REGION,
  accessKeyId: Env.S3.AWS_ACCESS_KEY_ID,
  secretAccessKey: Env.S3.AWS_SECRET_ACCESS_KEY,
});

export async function upLoadFile(file: any, fileName: any) {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ACL: "public-read", // Set the access control list for the uploaded file
  };
  return await s3.upload(params).promise();
}
