import { createObjectId } from '~/utils/format';
import Staff, { IStaff } from '../staff.model';
import slugify from 'slugify';
import { DOCUMENT_POSITION } from '../position.model';

const findOneById = async (id: string) => {
  return await Staff.findOne({
    _id: createObjectId(id),
    isDeleted: false
  }).lean();
};

const findOneByEmail = async (email: string, option: Partial<IStaff> = {}) => {
  return await Staff.findOne({
    email: email,
    ...option,
    isDeleted: false
  }).lean();
};

const deleteByPositionId = async (positionId: string) => {
  return await Staff.updateMany(
    {
      positionId: createObjectId(positionId),
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );
};

const create = async (data: IStaff) => {
  return await Staff.insertOne(data);
};

const update = async (data: Partial<IStaff>, id: string) => {
  return await Staff.updateOne(
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
  return await Staff.updateOne(
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
    query.firstName = {
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
  return await Staff.aggregate([
    {
      $match: {
        ...query,
        isDeleted: false
      }
    },
    {
      $limit: limit
    },
    {
      $skip: skip
    },
    {
      $lookup: {
        from: DOCUMENT_POSITION,
        localField: 'positionId',
        foreignField: '_id',
        as: 'position',
        pipeline: [
          {
            $match: {
              isDeleted: false,
              status: 'active'
            }
          }
        ]
      }
    },
    {
      $unwind: '$position'
    }
  ]);
};

const getDetail = async (id: string) => {
  return (
    await Staff.aggregate([
      {
        $match: {
          isDeleted: false,
          _id: createObjectId(id)
        }
      },
      {
        $lookup: {
          from: DOCUMENT_POSITION,
          foreignField: '_id',
          localField: 'positionId',
          as: 'position',
          pipeline: [
            {
              $match: {
                isDeleted: false,
                status: 'active'
              }
            }
          ]
        }
      },
      {
        $unwind: '$position'
      }
    ])
  )[0];
};
export const staffRepo = {
  findOneById,
  findOneByEmail,
  deleteByPositionId,
  create,
  update,
  deleteById,
  getList,
  getDetail
};
