import { createObjectId } from '~/utils/format';
import Order, { IOrder } from '../order.model';
import { DOCUMENT_USER, userModel } from '../user.model';
import { DOCUMENT_ADDRESS } from '../address.model';
import { DOCUMENT_PRODUCT } from '../product.model';
const findOneById = async (id: string) => {
  return await Order.findOne({
    _id: createObjectId(id),
    isDeleted: false
  }).lean();
};
const createNew = async (data: IOrder) => {
  return await Order.insertOne(data);
};
const changeStatus = async (
  orderStatus: 'pending' | 'confirmed' | 'success' | 'cancelled',
  id: string
) => {
  return await Order.updateOne(
    { _id: createObjectId(id), isDeleted: false },
    { $set: { orderStatus } }
  );
};
const getOrderByUserId = async (orderId: string, userId: string) => {
  return await Order.findOne({
    _id: createObjectId(orderId),
    userId: createObjectId(userId),
    isDeleted: false
  }).lean();
};

const getOrderDetail = async (orderId: string) => {
  return await Order.aggregate([
    {
      $match: {
        _id: createObjectId(orderId),
        isDeleted: false,
        paymentStatus: { $ne: 'unpaid' }
      }
    },
    {
      $lookup: {
        from: DOCUMENT_USER,
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $lookup: {
        from: DOCUMENT_ADDRESS,
        localField: 'deliveryAddress',
        foreignField: '_id',
        as: 'address'
      }
    },
    {
      $unwind: '$address'
    },
    {
      $lookup: {
        from: DOCUMENT_PRODUCT,
        localField: 'items.productId',
        foreignField: '_id',
        as: 'products'
      }
    }
  ]);
};
const getListOrder = async (option: {
  limit: number;
  page: number;
  sortKey?: string;
  sortValue?: 1 | -1 | undefined;
}) => {
  const { limit, page, sortKey, sortValue } = option;
  const query: Record<string, string | object> = {};
  const sort: Record<string, 1 | -1> = {};
  if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
  } else {
    sort['updatedAt'] = 1;
  }
  const skip = (page - 1) * limit;
  return await Order.aggregate([
    {
      $match: {
        isDeleted: false,
        paymentStatus: { $ne: 'unpaid' },
        ...query
      }
    },
    {
      $lookup: {
        from: userModel.COLLECTION_NAME,
        foreignField: '_id',
        localField: 'userId',
        as: 'user',
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
      $unwind: '$user'
    },
    {
      $limit: limit
    },
    {
      $skip: skip
    }
  ]);
};
const getListOrderUser = async (
  option: {
    limit: number;
    page: number;
    sortKey?: string;
    sortValue?: 1 | -1 | undefined;
  },
  userId: string
) => {
  const { limit, page, sortKey, sortValue } = option;
  const query: Record<string, string | object> = {};

  const sort: Record<string, 1 | -1> = {};
  if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
  } else {
    sort['updatedAt'] = 1;
  }
  return await Order.find({
    isDeleted: false,
    userId: createObjectId(userId),
    paymentStatus: { $ne: 'unpaid' },
    ...query
  })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sort);
};
const getDetail = async (orderId: string, option: Partial<IOrder> = {}) => {
  return await Order.findOne({
    _id: createObjectId(orderId),
    isDeleted: false,
    paymentStatus: { $ne: 'unpaid' },
    ...option
  })
    .populate({
      path: 'userId',
      select: 'fullName email phoneNumber'
    })
    .populate({
      path: 'deliveryAddress',
      select: 'recipientName phoneNumber address ward district city isDefault'
    })
    .populate({
      path: 'items.productId',
      select: 'productName productSlug imageUrl basePrice isAvailable'
    })
    .populate({
      path: 'items.sizeId',
      select: 'sizeName additionalPrice'
    })
    .populate({
      path: 'items.customs.customId',
      select: 'groupName groupType'
    })
    .populate({
      path: 'items.customs.optionId',
      select: 'optionName basePrice unitType'
    })
    .lean();
};
const getLatestOrder = async (userId: string) => {
  return await Order.findOne({
    userId: createObjectId(userId),
    isDeleted: false,
    paymentStatus: { $ne: 'unpaid' }
  })
    .sort({
      createdAt: -1
    })
    .populate({
      path: 'items.productId',
      select: 'productName categoryId'
    });
};

const getTotalAmount = async (): Promise<{
  totalAmount: number;
  orderCount: number;
  averageOrderValue: number;
}> => {
  return (
    await Order.aggregate([
      {
        $match: {
          orderStatus: 'success',
          isDeleted: false,
          paymentStatus: { $ne: 'unpaid' }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$subtotal' },
          orderCount: { $count: {} }
        }
      },
      {
        $project: {
          totalAmount: 1,
          orderCount: 1,
          averageOrderValue: {
            $cond: [{ $eq: ['$orderCount', 0] }, 0, { $divide: ['$totalAmount', '$orderCount'] }]
          }
        }
      }
    ])
  )[0];
};
const getRenvenureByTime = async ({ start, end }: { start: Date; end: Date }) => {
  return (
    await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          orderStatus: 'success', // chỉ tính đơn thành công
          paymentStatus: 'paid' // chỉ tính đơn đã thanh toán
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          startDate: start,
          endDate: end
        }
      }
    ])
  )[0];
};
export const orderRepo = {
  findOneById,
  createNew,
  changeStatus,
  getOrderByUserId,
  getOrderDetail,
  getListOrder,
  getListOrderUser,
  getDetail,
  getLatestOrder,
  getTotalAmount,
  getRenvenureByTime
};
