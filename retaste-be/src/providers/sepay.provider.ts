import { SePayPgClient } from 'sepay-pg-node';
import env from '~/configs/environments';

export const client = new SePayPgClient({
  env: 'sandbox',
  merchant_id: env.SEPAY_MERCHANT_ID,
  secret_key: env.SEPAY_SECRET_KEY
});
