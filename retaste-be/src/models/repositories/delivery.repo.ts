import { createObjectId } from '~/utils/format';
import Delivery, { IDelivery } from '../delivery.model';

const getDeliveryByOrderId = async (orderId: string) => {
  return await Delivery.findOne({
    orderId: createObjectId(orderId),
    isDeleted: false
  }).lean();
};

const craeteNew = async (data: IDelivery) => {
  return await Delivery.insertOne(data);
};
const getRateDelivery = async () => {
  return (
    await Delivery.aggregate([
      {
        $match: {
          status: { $in: ['success', 'pending'] },
          isDeleted: false
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          successCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'success'] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          total: '$total',
          successCount: '$successCount',
          successRate: {
            $cond: [
              { $eq: ['$total', 0] },
              0,
              {
                $multiply: [{ $divide: ['$successCount', '$total'] }, 100]
              }
            ]
          }
        }
      }
    ])
  )[0];
};
export const deliveryRepo = {
  getDeliveryByOrderId,
  craeteNew,
  getRateDelivery
};
