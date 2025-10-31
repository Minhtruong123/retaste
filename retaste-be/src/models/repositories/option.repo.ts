import { createObjectId } from '~/utils/format';
import Option, { IProductOption } from '../option.model';

const findOneById = async (id: string) => {
  return await Option.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};
const getOptionByCustomId = async (customId: string) => {
  return await Option.find({
    customizationGroupId: createObjectId(customId),
    isDeleted: false
  });
};
const createNew = async (data: IProductOption) => {
  return await Option.insertOne(data);
};
const createMany = async (data: IProductOption[]) => {
  return await Option.insertMany(data);
};

const update = async (data: Partial<IProductOption>, id: string) => {
  return await Option.updateOne(
    {
      _id: createObjectId(id),
      isDeleted: false
    },
    {
      $set: data
    }
  );
};

const deleteById = async (id: string) => {
  return await Option.updateOne(
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
const deleteByCustomId = async (customId: string) => {
  return await Option.updateOne(
    {
      customizationGroupId: createObjectId(customId),
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );
};
export const optionRepo = {
  createNew,
  createMany,
  update,
  deleteByCustomId,
  deleteById,
  findOneById,
  getOptionByCustomId
};
