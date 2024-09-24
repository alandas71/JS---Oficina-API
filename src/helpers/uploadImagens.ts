import fs from "fs";
import { s3 } from "../services/s3BackBlaze";
import { S3 } from "aws-sdk";
import { File } from "Interfaces/FileInterface";
import { UploadResponse } from "Interfaces/UploadResponseInterface";

const uploadImagens = async (files: File[]): Promise<UploadResponse> => {
  let fileContents: string[] = [];
  let originalFile: string[] = [];
  try {
    for (const file of files) {
      let newFilename = `${Date.now().toString()}-${file.newFilename}`;
      const params: S3.Types.PutObjectRequest = {
        Bucket: process.env.BBZ_BUCKET_NAME ?? "s-oficina",
        Key: newFilename,
        Body: fs.readFileSync(file.filepath),
        ContentType: file.mimetype,
      };
      await s3.upload(params).promise();
      fileContents = [...fileContents, newFilename];
      originalFile = [...originalFile, file.originalFilename];
    }
  } catch (error) {
    console.log(error)
    return { message: "Erro no upload do arquivo", status: 400 };
  }
  return { status: 200, fileContents, originalFile };
};

export default uploadImagens;
