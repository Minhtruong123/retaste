import 'dotenv/config';

const env: {
  APP_PORT: number;
  APP_HOST: string;
  MONGO_URI: string;
  DATABASE_NAME: string;
  BUILD_MODE: string;
  BREVO_API_KEY: string;
  EMAIL_NAME: string;
  EMAIL_ADDRESS: string;
  CLOUD_NAME: string;
  CLOUD_API_KEY: string;
  CLOUD_API_SECRET: string;
  SEPAY_SECRET_KEY: string;
  SEPAY_MERCHANT_ID: string;
  LALAMOVE_API_KEY: string;
  LALAMOVE_BASE_URL: string;
  LALAMOVE_API_SECRET: string;
  ACCESS_TOKEN_SECRET_SIGNATURE: string;
  ACCESS_TOKEN_LIFE: string;
  REFRESH_TOKEN_SECRET_SIGNATURE: string;
  REFRESH_TOKEN_LIFE: string;
  SEPAY_SECRET_KEY_DEV: string;
  SEPAY_MERCHANT_ID_DEV: string;
} = {
  APP_PORT: parseInt(process.env.APP_PORT || '3000', 10),
  APP_HOST: process.env.APP_HOST || 'localhost',
  MONGO_URI: process.env.MONGO_URI || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  BUILD_MODE: process.env.BUILD_MODE || '',
  BREVO_API_KEY: process.env.BREVO_API_KEY || '',
  EMAIL_NAME: process.env.EMAIL_NAME || '',
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || '',
  CLOUD_NAME: process.env.CLOUD_NAME || '',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || '',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || '',
  SEPAY_SECRET_KEY: process.env.SEPAY_SECRET_KEY || '',
  SEPAY_MERCHANT_ID: process.env.SEPAY_MERCHANT_ID || '',
  LALAMOVE_API_KEY: process.env.LALAMOVE_API_KEY || '',
  LALAMOVE_BASE_URL: process.env.LALAMOVE_BASE_URL || '',
  LALAMOVE_API_SECRET: process.env.LALAMOVE_API_SECRET || '',
  ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE || '',
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE || '',
  REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE || '',
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE || '',
  SEPAY_SECRET_KEY_DEV: process.env.SEPAY_SECRET_KEY_DEV || '',
  SEPAY_MERCHANT_ID_DEV: process.env.SEPAY_MERCHANT_ID_DEV || ''
};
export default env;
