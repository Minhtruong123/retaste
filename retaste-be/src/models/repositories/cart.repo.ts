import { createObjectId } from '~/utils/format';
import Cart from '../cart.model';
import { Types } from 'mongoose';

const findCartByUserId = async (userId: string) => {
  return await Cart.findOne({
    userId: createObjectId(userId)
  });
};

const createNew = async (userId: string) => {
  return await Cart.insertOne({
    userId: createObjectId(userId)
  });
};

const addProduct = async (
  userId: string,
  data: {
    index?: number;
    data: {
      productId: Types.ObjectId;
      sizeId: Types.ObjectId;
      customs: { customId: Types.ObjectId; optionId: Types.ObjectId; quantity?: number }[];
      quantity: number;
    };
  }
) => {
  if (data.index)
    return await Cart.updateOne(
      {
        userId: createObjectId(userId)
      },
      {
        $set: {
          [`products.${data.index}`]: data.data
        }
      }
    );
  else
    return await Cart.updateOne(
      {
        userId: createObjectId(userId)
      },
      {
        $push: data.data
      }
    );
};

export const cartRepo = {
  createNew,
  findCartByUserId,
  addProduct
};
