import { createObjectId } from '~/utils/format';
import Cart from '../cart.model';

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

export const cartRepo = {
  createNew,
  findCartByUserId
};
