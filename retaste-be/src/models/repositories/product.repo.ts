import { createObjectId } from '~/utils/format';
import Product, { IProduct } from '../product.model';
import slugify from 'slugify';
import { sizeModel } from '../size.model';
import { customGroupModel } from '../customGroup.model';
import { optionModel } from '../option.model';
import { categoryModel } from '../category.model';

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
  const skip = (page - 1) * limit;
  return await Product.find({
    isDeleted: false,
    ...query
  })
    .limit(limit)
    .skip(skip)
    .sort(sort);
};
const deleteProduct = async (id: string) => {
  return await Product.findOneAndUpdate(
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
const getDetail = async (id: string) => {
  const start = Date.now();
  const result = await Product.aggregate([
    {
      $match: {
        _id: createObjectId(id),
        isDeleted: false
      }
    },
    {
      $lookup: {
        from: sizeModel.COLLECTION_NAME,
        localField: '_id',
        foreignField: 'productId',
        as: 'sizes',
        pipeline: [
          {
            $match: {
              isDeleted: false
            }
          }
        ]
      }
    },
    {
      $lookup: {
        from: customGroupModel.COLLECTION_NAME,
        localField: '_id',
        foreignField: 'productId',
        as: 'customization_groups',
        pipeline: [
          {
            $match: {
              isDeleted: false
            }
          },
          {
            $lookup: {
              from: optionModel.COLLECTION_NAME,
              localField: '_id',
              foreignField: 'customizationGroupId',
              as: 'options',
              pipeline: [
                {
                  $match: {
                    isDeleted: false
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      $lookup: {
        from: categoryModel.COLLECTION_NAME,
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categorie',
        pipeline: [
          {
            $match: {
              isDeleted: false
            }
          }
        ]
      }
    },
    {
      $unwind: '$categorie'
    }
  ]);
  const end = Date.now();
  console.log(`Query time: ${end - start} ms`);
  return result;
};
export const productRepo = {
  createNew,
  update,
  getListProduct,
  deleteProduct,
  getDetail,
  findOneById
};
