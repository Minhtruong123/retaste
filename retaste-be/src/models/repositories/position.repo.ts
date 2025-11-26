import { createObjectId } from '~/utils/format';
import Position, { IPosition } from '../position.model';
import slugify from 'slugify';

const findOneById = async (id: string) => {
  return await Position.findOne({
    _id: createObjectId(id),
    isDeleted: false
  }).lean();
};
const findOneByName = async (name: string) => {
  return await Position.findOne({
    isDeleted: false,
    name: name
  }).lean();
};

const create = async (data: IPosition) => {
  return await Position.insertOne(data);
};

const update = async (data: Partial<IPosition>, id: string) => {
  return await Position.updateOne(
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
  return await Position.updateOne(
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

const getList = async (option: {
  limit: number;
  page: number;
  keyWord: string | undefined;
  sortKey?: string;
  sortValue?: 1 | -1 | undefined;
}) => {
  const { limit, page, keyWord, sortKey, sortValue } = option;
  const query: Record<string, string | object> = {};
  if (keyWord) {
    query.name = {
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
  const skip = (page - 1) * limit;
  return await Position.find({
    ...query,
    isDeleted: false
  })
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .lean();
};

const getDetail = async (id: string) => {
  return await Position.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};

export const positionRepo = {
  findOneById,
  create,
  update,
  deleteById,
  getList,
  findOneByName,
  getDetail
};
