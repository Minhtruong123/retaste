import { createObjectId } from '~/utils/format';
import Size, { ISize } from '../size.model';

const findOneById = async (id: string) => {
  return Size.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};

const createNew = async (data: ISize) => {
  return await Size.insertOne(data);
};
const createMany = async (data: ISize[]) => {
  return await Size.insertMany(data);
};

const getSizeByProductId = async (productId: string) => {
  return await Size.find({
    isDeleted: false,
    productId: productId
  });
};

const deleteByProductId = async (productId: string) => {
  return await Size.updateMany(
    {
      productId: createObjectId(productId),
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );
};

const deleteById = async (id: string) => {
  return await Size.updateOne(
    {
      _id: createObjectId(id),
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );
};

const update = async (data: Partial<ISize>, id: string) => {
  return await Size.updateOne(
    {
      _id: createObjectId(id),
      isDeleted: false
    },
    {
      $set: data
    }
  );
};

export const sizeRepo = {
  createNew,
  createMany,
  getSizeByProductId,
  deleteByProductId,
  deleteById,
  update,
  findOneById
};
