import { createObjectId } from '~/utils/format';
import Product, { IProduct } from '../product.model';
import slugify from 'slugify';
import { sizeModel } from '../size.model';
import { customGroupModel } from '../customGroup.model';
import { optionModel } from '../option.model';
import { categoryModel } from '../category.model';
import { ObjectId } from 'mongoose';

const findOneById = async (id: string) => {
  return await Product.findOne({
    _id: createObjectId(id),
    isDeleted: false,
    isActive: true
  });
};

const createNew = async (data: IProduct) => {
  return await Product.insertOne(data);
};
const update = async (data: Partial<IProduct>, id: string) => {
  return await Product.updateOne(
    {
      _id: createObjectId(id),
      isDeleted: false,
      isActive: true
    },
    {
      $set: data
    }
  );
};
const getListProduct = async (
  option: {
    limit: number;
    page: number;
    keyWord: string | undefined;
    sortKey?: string;
    sortValue?: 1 | -1 | undefined;
  },
  choice: Partial<IProduct> = {}
) => {
  const { limit, page, keyWord, sortKey, sortValue } = option;
  const query: Record<string, string | object> = {};
  if (keyWord) {
    query.productSlug = {
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
  return await Product.aggregate([
    {
      $match: {
        ...query,
        isDeleted: false,
        ...choice,
        isActive: true
      }
    },
    {
      $lookup: {
        from: categoryModel.COLLECTION_NAME,
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
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
      $unwind: '$category'
    },
    {
      $limit: limit
    },
    {
      $skip: skip
    }
  ]);
};
const deleteProduct = async (id: string) => {
  return await Product.findOneAndUpdate(
    {
      _id: createObjectId(id),
      isDeleted: false,
      isActive: true
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );
};
const deleteByCategoryId = async (categoryId: string) => {
  return await Product.updateMany(
    {
      categoryId: createObjectId(categoryId),
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );
};

const restoreByCategoryId = async (categoryId: string) => {
  return await Product.updateMany(
    {
      categoryId: createObjectId(categoryId),
      isDeleted: false,
      isActive: false
    },
    {
      $set: {
        isActive: true
      }
    }
  );
};
const deactivateByCategoryId = async (categoryId: string) => {
  return await Product.updateMany(
    {
      categoryId: createObjectId(categoryId),
      isDeleted: false,
      isActive: true
    },
    {
      $set: {
        isActive: false
      }
    }
  );
};

const getDetail = async (id: string, option: Partial<IProduct> = {}) => {
  const result = await Product.aggregate([
    {
      $match: {
        _id: createObjectId(id),
        isDeleted: false,
        ...option,
        isActive: true
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
        as: 'category',
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
      $unwind: '$category'
    }
  ]);
  return result[0];
};
const getRelated = async (categories: ObjectId[], lastestProduct: ObjectId[]) => {
  return await Product.find({
    categoryId: { $in: categories },
    isDeleted: false,
    _id: { $nin: lastestProduct },
    isActive: true
  });
};
export const productRepo = {
  createNew,
  update,
  getListProduct,
  deleteProduct,
  getDetail,
  findOneById,
  getRelated,
  deleteByCategoryId,
  restoreByCategoryId,
  deactivateByCategoryId
};
