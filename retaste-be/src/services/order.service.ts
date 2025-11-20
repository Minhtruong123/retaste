/**
 * view order
 * create order
 */

import { BAD_REQUEST } from '~/core/errors.response';
import { IOrder } from '~/models/order.model';
import { cartRepo } from '~/models/repositories/cart.repo';
import { createObjectId } from '~/utils/format';
import { v4 as uuidv4 } from 'uuid';
import { addressRepo } from '~/models/repositories/address.repo';
import { Types } from 'mongoose';
import { lalaMoveProvider } from '~/providers/lalamove.provider';
class OrderService {
  static viewOrder = async (
    data: {
      deliveryAddress: string;
      items: string[];
    },
    userId: string
  ) => {
    const { items, deliveryAddress } = data;
    const cartDetail: {
      product: {
        _id: Types.ObjectId;
        categoryId: string;
        productName: string;
        productSlug: string;
        description: string;
        basePrice: number;
        preparationTime: number;
        imageUrl: string;
        isAvailable: boolean;
        isDeleted: boolean;
        isFeatured: boolean;
      };
      customsWithOptions: {
        customId: Types.ObjectId;
        optionId: Types.ObjectId;
        quantity?: number;
        customData: {
          _id: string;
          productId: string;
          groupName: string;
          groupType: 'single_select' | 'multi_select' | 'quantity_based';
          isRequired: boolean;
          isDeleted: boolean;
          minSelections: number;
          maxSelections?: number;
          displayOrder: number;
        };

        optionData: {
          _id: string;
          customizationGroupId: string;
          optionName: string;
          basePrice: number;
          unitType: 'item';
          minQuantity: number;
          maxQuantity?: number;
          defaultQuantity?: number;
          pricePerUnit?: number;
          isAvailable: boolean;
          isDeleted: boolean;
          displayOrder: number;
        };
      }[];
      size: {
        _id: Types.ObjectId;
      };
      quantity: number;
      itemId: Types.ObjectId;
    }[] = await cartRepo.getCorrespondingProduct(items, userId);
    if (!cartDetail.length) return [];
    const getAddres = await addressRepo.getAddressById(deliveryAddress, userId);
    if (!getAddres) throw new BAD_REQUEST('Address is not valid !');
    let totalCostOrder = 0;
    const viewOrder: Partial<IOrder> = {
      userId: createObjectId(userId),
      orderNumber: uuidv4(),
      orderStatus: 'pending',
      items: cartDetail.map((c) => {
        const item: {
          productId: Types.ObjectId;
          sizeId: Types.ObjectId;
          customs: {
            customId: Types.ObjectId;
            optionId: Types.ObjectId;
            quantity?: number;
            basePrice: number;
            totalPrice: number;
          }[];
          quantity: number;
          basePrice: number;
          totalPrice: number;
        } = {
          productId: c.product._id,
          sizeId: c.size._id,
          customs: c.customsWithOptions.map((custom) => {
            if (custom.quantity) {
              return {
                customId: custom.customId,
                optionId: custom.optionId,
                quantity: custom.quantity,
                basePrice: custom.optionData.basePrice,
                totalPrice: custom.optionData.basePrice * custom.quantity
              };
            } else {
              return {
                customId: custom.customId,
                optionId: custom.optionId,
                basePrice: custom.optionData.basePrice,
                totalPrice: custom.optionData.basePrice
              };
            }
          }),
          quantity: c.quantity,
          basePrice: c.product.basePrice,
          totalPrice: c.product.basePrice * c.quantity
        };
        totalCostOrder += item.totalPrice;
        return item;
      })
    };
    const quotationPayload = {
      serviceType: 'MOTORCYCLE',
      specialRequests: [],
      language: 'vi_VN',
      stops: [
        {
          coordinates: {
            lat: '16.0637251',
            lng: '108.1857232'
          },
          address: 'Cù Chính Lan, Phường Thanh Khê, Thành phố Đà Nẵng, 84236, Việt Nam'
        },
        {
          coordinates: {
            lat: '16.0669747',
            lng: '108.1997848'
          },
          address: 'Wu Kai Sha Road'
        }
      ]
    };
    await lalaMoveProvider.quotationsDetail(quotationPayload);
    return {
      address: getAddres,
      order: viewOrder
    };
  };
  static create = async () => {
    return {};
  };
}
export default OrderService;
