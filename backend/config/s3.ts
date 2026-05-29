import AWS from "aws-sdk";
import multer from "multer";
import path from "path";

// AWS config
const s3 = new AWS.S3({
  region: process.env.AWS_REGION!,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});
 
// multer memory storage (IMPORTANT)
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
  },
});

const generateFileName = (file: any) => {
  const ext = path.extname(file.originalname);
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${ext}`;
};

// upload function - NO ACL (bucket handles permissions)
export const uploadToS3 = async (file: any, type: string) => {
  const fileName = `course-content/${type}/${generateFileName(file)}`;

  const result = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // REMOVE ACL: 'public-read',
    })
    .promise();

  return {
    url: result.Location,
    key: fileName,
  };
};

// delete
export const deleteFromS3 = async (fileUrl: string) => {
  // Extract key from URL (more robust way)
  const url = new URL(fileUrl);
  const key = url.pathname.substring(1); // Remove leading slash
  
  await s3
    .deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    })
    .promise();
};