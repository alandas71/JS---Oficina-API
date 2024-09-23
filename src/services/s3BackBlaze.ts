import AWS from "aws-sdk";
export const s3 = new AWS.S3({
  accessKeyId: process.env.BBZ_ACCESS_KEY_ID_APP,
  secretAccessKey: process.env.BBZ_SECRET_ACCESS_KEY_APP,
  endpoint: process.env.BBZ_S3_ENDPOINT,
  s3ForcePathStyle: true,
});
