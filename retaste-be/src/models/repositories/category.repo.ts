import { createObjectId } from '~/utils/format';
import Category, { ICategory } from '../category.model';
import slugify from 'slugify';

const findOneById = async (id: string) => {
  return await Category.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};

const createNew = async (data: ICategory) => {
  return await Category.insertOne(data);
};
const update = async (data: Partial<ICategory>, id: string) => {
  return await Category.updateOne(
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
  return await Category.updateOne(
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
const getListCategory = async (option: {
  limit: number;
  page: number;
  keyWord: string | undefined;
  sortKey?: string;
  sortValue?: 1 | -1 | undefined;
}) => {
  const { limit, page, keyWord, sortKey, sortValue } = option;
  const query: Record<string, string | object> = {};
  if (keyWord) {
    query.slug = {
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
  return await Category.find({
    _destroy: false,
    ...query
  })
    .limit(limit)
    .skip(page)
    .sort(sort);
};

export const categoryRepo = {
  createNew,
  findOneById,
  update,
  getListCategory,
  deleteById
};
