import { createObjectId } from '~/utils/format';
import Product, { IProduct } from '../product.model';
import slugify from 'slugify';

const findOneById = async (id: string) => {
  return await Product.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};

const createNew = async (data: IProduct) => {
  return await Product.insertOne(data);
};
const update = async (data: Partial<IProduct>, id: string) => {
  return await Product.updateOne(
    {
      _id: createObjectId(id),
      isDeleted: false
    },
    {
      $set: data
    }
  );
};
const getListProduct = async (option: {
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
  return await Product.find({
    isDeleted: false,
    ...query
  })
    .limit(limit)
    .skip(page)
    .sort(sort);
};
const deleteProduct = async (id: string) => {
  return await Product.updateOne(
    {
      _id: createObjectId(id)
    },
    {
      $set: {
        isDeleted: false
      }
    }
  );
};
const getDetail = async (id: string) => {
  return await Product.findById(id);
};
export const productRepo = {
  createNew,
  update,
  getListProduct,
  deleteProduct,
  getDetail,
  findOneById
};
