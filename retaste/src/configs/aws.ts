import { S3Client } from '@aws-sdk/client-s3';
import env from './environments';
const s3ClientConfig = {
  credentials: {
    accessKeyId: env.AWS_S3_BUCKET_PUBLIC_ACCESS_KEY,
    secretAccessKey: env.AWS_S3_BUSKET_SECRET_ACCESS_KEY
  },
  region: env.AWS_REGION
};
export const s3Client = new S3Client(s3ClientConfig);
