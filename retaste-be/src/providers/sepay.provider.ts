import { SePayPgClient } from 'sepay-pg-node';
import env from '~/configs/environments';

export const clientSepay = new SePayPgClient({
  env: 'sandbox',
  merchant_id: env.SEPAY_MERCHANT_ID_DEV,
  secret_key: env.SEPAY_SECRET_KEY_DEV
});
export const cancelOrder = async (orderInvoiceNumber: string) => {
  try {
    const response = await clientSepay.order.cancel(orderInvoiceNumber);
    return response;
  } catch (error) {
    console.error('Error cancelling order:', error);
  }
};
