import { createObjectId } from '~/utils/format';
import CustomizationGroup, { ICustomizationGroup } from '../customGroup.model';

const findOneById = async (id: string) => {
  return await CustomizationGroup.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};

const createNew = async (data: ICustomizationGroup) => {
  return await CustomizationGroup.insertOne(data);
};
const createMany = async (data: ICustomizationGroup[]) => {
  return await CustomizationGroup.insertMany(data);
};

const deleteByProductId = async (productId: string) => {
  return await CustomizationGroup.updateMany(
    {
      productId: createObjectId(productId),
      isDeleted: false
    },
    {
      $set: {
        isDeleted: false
      }
    }
  );
};

const getCustomByProductId = async (productId: string) => {
  return await CustomizationGroup.find({
    isDeleted: false,
    productId: productId
  });
};

const deleteById = async (id: string) => {
  return await CustomizationGroup.updateOne(
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

const update = async (data: Partial<ICustomizationGroup>, id: string) => {
  return await CustomizationGroup.updateOne(
    {
      _id: createObjectId(id),
      isDeleted: false
    },
    {
      $set: data
    }
  );
};
export const customRepo = {
  createNew,
  createMany,
  deleteByProductId,
  update,
  getCustomByProductId,
  deleteById,
  findOneById
};
