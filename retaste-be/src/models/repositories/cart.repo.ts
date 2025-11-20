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
const getCorrespondingProduct = async (items: string[], userId: string) => {
  const objectIds = items.map((id) => createObjectId(id));

  const cartDetails = await Cart.aggregate([
    {
      $match: {
        userId: createObjectId(userId)
      }
    },
    { $unwind: '$products' },
    {
      $match: {
        'products._id': { $in: objectIds }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'sizes',
        localField: 'products.sizeId',
        foreignField: '_id',
        as: 'size'
      }
    },
    {
      $unwind: '$size'
    },
    {
      $lookup: {
        from: 'customization_groups',
        localField: 'products.customs.customId',
        foreignField: '_id',
        as: 'customsData'
      }
    },
    {
      $lookup: {
        from: 'options',
        localField: 'products.customs.optionId',
        foreignField: '_id',
        as: 'optionsData'
      }
    },
    {
      $addFields: {
        customsWithOptions: {
          $map: {
            input: '$products.customs',
            as: 'custom',
            in: {
              customId: '$$custom.customId',
              optionId: '$$custom.optionId',
              quantity: '$$custom.quantity',
              customData: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$customsData',
                      cond: { $eq: ['$$this._id', '$$custom.customId'] }
                    }
                  },
                  0
                ]
              },
              optionData: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$optionsData',
                      cond: { $eq: ['$$this._id', '$$custom.optionId'] }
                    }
                  },
                  0
                ]
              }
            }
          }
        }
      }
    },
    {
      $addFields: {
        quantity: '$products.quantity',
        itemId: '$products._id'
      }
    },
    {
      $project: {
        customsData: 0,
        optionsData: 0,
        products: 0
      }
    }
  ]);
  return cartDetails;
};

export const cartRepo = {
  createNew,
  findCartByUserId,
  addProduct,
  removeProduct,
  getDetail,
  getCorrespondingProduct
};
