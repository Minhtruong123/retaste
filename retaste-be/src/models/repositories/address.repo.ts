import { createObjectId } from '~/utils/format';
import Address, { IAddress } from '../address.model';
import slugify from 'slugify';

const findAddressByStreet = async (street: string, userId: string) => {
  return await Address.findOne({
    streetAddress: street,
    userId: createObjectId(userId),
    isDeleted: false
  });
};
const getListAddress = async (option: {
  limit: number;
  page: number;
  keyWord: string | undefined;
  sortKey?: string;
  sortValue?: 1 | -1 | undefined;
}) => {
  const { limit, page, keyWord, sortKey, sortValue } = option;
  const query: Record<string, string | object> = {};
  if (keyWord) {
    query.streetAddressSlug = {
      $regex: slugify(keyWord, {
        lower: true,
        trim: true,
        locale: 'vi',
        strict: true
      }),
      $options: 'i'
    };
  }
  const sort: Record<string, 1 | -1> = {};
  if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
  } else {
    sort['updatedAt'] = 1;
  }
  return await Address.find({
    isDeleted: false,
    ...query
  })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sort);
};

const isDefault = async (userId: string) => {
  return await Address.findOne({
    userId: createObjectId(userId),
    isDefault: true
  });
};
const getDetail = async (id: string, userId: string) => {
  return await Address.findOne({
    _id: createObjectId(id),
    userId: createObjectId(userId),
    isDeleted: false
  });
};
const createNew = async (data: IAddress) => {
  return await Address.insertOne(data);
};
const udpate = async (data: Partial<IAddress>, id: string, userId: string) => {
  return await Address.updateOne(
    {
      userId: createObjectId(userId),
      _id: createObjectId(id),
      isDeleted: false
    },
    {
      $set: data
    }
  );
};
const deleteById = async (id: string, userId: string) => {
  return await Address.updateOne(
    {
      _id: createObjectId(id),
      isDeleted: false,
      userId: createObjectId(userId)
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );
};
const getAddressById = async (id: string, userId: string) => {
  return await Address.findOne({
    userId: createObjectId(userId),
    _id: createObjectId(id),
    isDeleted: false
  });
};

export const addressRepo = {
  findAddressByStreet,
  createNew,
  udpate,
  getListAddress,
  deleteById,
  isDefault,
  getDetail,
  getAddressById
};
