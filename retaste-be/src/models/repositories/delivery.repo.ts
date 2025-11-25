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
const getAll = async () => {
  return await Delivery.find({
    $or: [{ status: 'pending' }, { status: 'success' }]
  });
};
export const deliveryRepo = {
  getDeliveryByOrderId,
  craeteNew,
  getAll
};
