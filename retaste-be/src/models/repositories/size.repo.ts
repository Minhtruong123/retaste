import { createObjectId } from '~/utils/format';
import Size, { ISize } from '../size.model';

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
      isDeleted: true
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
        isDefault: true
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
  update
};
