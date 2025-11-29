/* eslint-disable no-console */
import cron from 'node-cron';
import Order from './models/order.model';
cron.schedule('*/30 * * * *', async () => {
  try {
    const THIRTY_MINUTES_AGO = new Date(Date.now() - 30 * 60 * 1000);

    const result = await Order.deleteMany({
      paymentStatus: 'unpaid',
      createdAt: { $lte: THIRTY_MINUTES_AGO },
      isDeleted: false
    });

    console.log(`[CRON] Deleted ${result.deletedCount} unpaid orders`);
  } catch (err) {
    console.error('[CRON ERROR]', err);
  }
});

console.log('[CRON] Order cleanup job started');
