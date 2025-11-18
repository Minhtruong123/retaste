import { createObjectId } from '~/utils/format';
import Order, { IOrder } from '../order.model';
const findOneById = async (id: string) => {
  return await Order.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};
const createNew = async (data: IOrder) => {
  return await Order.insertOne(data);
};

export const orderModel = {
  findOneById,
  createNew
};
