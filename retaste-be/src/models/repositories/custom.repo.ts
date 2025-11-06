import { createObjectId } from '~/utils/format';
import CustomizationGroup, { ICustomizationGroup } from '../customGroup.model';
import { optionModel } from '../option.model';

const findOneById = async (id: string) => {
  return await CustomizationGroup.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};

const findByProductId = async (productId: string) => {
  return await CustomizationGroup.findOne({
    productId: createObjectId(productId)
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
        isDeleted: true
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

const getValidCustomizationsWithOptions = async (
  customs: { customId: string; optionId: string; quantity?: number }[]
) => {
  const result = await CustomizationGroup.aggregate([
    {
      $match: {
        _id: { $in: customs.map((i) => createObjectId(i.customId)) },
        isDeleted: false
      }
    },
    {
      $lookup: {
        from: optionModel.COLLECTION_NAME,
        let: { groupId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$customizationGroupId', '$$groupId'] },
                  { $eq: ['$isDeleted', false] },
                  { $eq: ['$isAvailable', true] },
                  {
                    $in: ['$_id', customs.map((c) => createObjectId(c.optionId))]
                  }
                ]
              }
            }
          },
          {
            $project: {
              _id: 1,
              optionName: 1,
              basePrice: 1,
              unitType: 1,
              minQuantity: 1,
              maxQuantity: 1,
              defaultQuantity: 1,
              pricePerUnit: 1,
              isAvailable: 1
            }
          }
        ],
        as: 'options'
      }
    },
    {
      $match: {
        'options.0': { $exists: true } // Chỉ lấy groups có ít nhất 1 option hợp lệ
      }
    },
    {
      $project: {
        _id: 1,
        groupName: 1,
        options: 1
      }
    }
  ]);

  return result;
};

export const customRepo = {
  createNew,
  createMany,
  deleteByProductId,
  update,
  getCustomByProductId,
  deleteById,
  findOneById,
  findByProductId,
  getValidCustomizationsWithOptions
};
