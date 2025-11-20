/**
 * view order
 * create order
 */

import { BAD_REQUEST } from '~/core/errors.response';
import { cartRepo } from '~/models/repositories/cart.repo';
import { createObjectId } from '~/utils/format';
import { v4 as uuidv4 } from 'uuid';
import { IOrder } from '~/models/order.model';
import { addressRepo } from '~/models/repositories/address.repo';
import { Types } from 'mongoose';
import { lalaMoveProvider } from '~/providers/lalamove.provider';
import Address from '~/models/address.model';
import { orderRepo } from '~/models/repositories/order.repo';
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
    if (!cartDetail.length) {
      throw new BAD_REQUEST('Products are not valid !');
    }
    const getAddres = await addressRepo.getAddressById(deliveryAddress, userId);
    if (!getAddres) throw new BAD_REQUEST('Address is not valid !');
    let totalCostOrder = 0;

    const stopSender = await Address.findOne({
      streetAddressSlug: '400-dien-bien-phu-1763627299126'
    });
    if (!stopSender) throw new BAD_REQUEST('400-dien-bien-phu-1763627299126');
    const quotation = await lalaMoveProvider.quotationDetail(
      {
        address: stopSender?.streetAddress,
        coordinates: {
          lat: stopSender.lat,
          lng: stopSender.lng
        }
      },
      {
        address: getAddres.streetAddress,
        coordinates: {
          lat: getAddres.lat,
          lng: getAddres.lng
        }
      }
    );
    const orderNumber = uuidv4();
    const viewOrder: Partial<IOrder> = {
      userId: createObjectId(userId),
      orderNumber,
      orderStatus: 'pending',
      items: cartDetail.map((c) => {
        const item = {
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
      }),
      subtotal: totalCostOrder,
      deliveryFee: quotation.priceBreakdown.total,
      totalAmount: totalCostOrder + quotation.priceBreakdown.total
    };
    return {
      address: getAddres,
      quotation,
      order: viewOrder
    };
  };
  static create = async (
    data: {
      deliveryAddress: string;
      items: string[];
      paymentMethod: 'cash' | 'bank_transfer';
    },
    userId: string
  ) => {
    const { items, deliveryAddress, paymentMethod } = data;
    const { quotation, order } = await this.viewOrder(
      {
        deliveryAddress,
        items
      },
      userId
    );
    if (paymentMethod === 'cash') {
      //
    } else {
      const newOrder = {
        ...order,
        deliveryAddress: createObjectId(deliveryAddress),
        paymentMethod,
        paymentStatus: 'pending',
        userId: createObjectId(userId)
      } as IOrder;
      const created = await orderRepo.createNew(newOrder);
      const deliveryOrder = await lalaMoveProvider.createOrder(quotation);
      return {
        order: created,
        deliveryOrder
      };
    }
  };
}
export default OrderService;
