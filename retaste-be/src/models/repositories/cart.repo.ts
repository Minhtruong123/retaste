import { createObjectId } from '~/utils/format';
import Cart from '../cart.model';
import { Types } from 'mongoose';
import { DOCUMENT_PRODUCT } from '../product.model';
import { DOCUMENT_SIZE } from '../size.model';
import { DOCUMENT_CUSTOM_GROUP } from '../customGroup.model';
import { DOCUMENT_OPTIONS } from '../option.model';

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
      createdAt: Date;
    };
  }
) => {
  if (data.index === 0 || data.index) {
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
  }
  return await Cart.updateOne(
    {
      userId: createObjectId(userId)
    },
    {
      $push: {
        products: data.data
      }
    }
  );
};
const removeProduct = async (userId: string, index: number) => {
  return await Cart.updateOne(
    {
      userId: createObjectId(userId)
    },
    {
      $unset: {
        [`products.${index}`]: 1
      }
    }
  );
};
const getDetail = async (userId: string) => {
  return await Cart.findOne({
    userId: createObjectId(userId)
  })
    .populate({
      path: 'products.productId',
      model: DOCUMENT_PRODUCT
    })
    .populate({
      path: 'products.sizeId',
      model: DOCUMENT_SIZE
    })
    .populate({
      path: 'products.customs.customId',
      model: DOCUMENT_CUSTOM_GROUP
    })
    .populate({
      path: 'products.customs.optionId',
      model: DOCUMENT_OPTIONS
    })
    .lean();
};
export const cartRepo = {
  createNew,
  findCartByUserId,
  addProduct,
  removeProduct,
  getDetail
};
