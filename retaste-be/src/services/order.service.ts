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
import { orderRepo } from '~/models/repositories/order.repo';
import { clientSepay } from '~/providers/sepay.provider';
import { deliveryRepo } from '~/models/repositories/delivery.repo';
import { userRepo } from '~/models/repositories/user.repo';
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
    if (!getAddres) throw new BAD_REQUEST('Address recipient is not exist !');
    let totalCostOrder = 0;

    const stopSender = await addressRepo.getAddressAdmin();
    if (!stopSender) throw new BAD_REQUEST('Address sender is not exist !');
    const quotation = await lalaMoveProvider.quotationDetail(
      {
        coordinates: {
          lat: stopSender.lat,
          lng: stopSender.lng
        },
        address: stopSender.streetAddress
      },
      {
        coordinates: {
          lat: getAddres.lat,
          lng: getAddres.lng
        },
        address: getAddres.streetAddress
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
      deliveryFee: parseFloat(quotation.priceBreakdown.total),
      totalAmount: totalCostOrder + parseFloat(quotation.priceBreakdown.total)
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

    const { order } = await this.viewOrder(
      {
        deliveryAddress,
        items
      },
      userId
    );
    const newOrder = {
      ...order,
      deliveryAddress: createObjectId(deliveryAddress),
      paymentMethod,
      paymentStatus: 'pending',
      userId: createObjectId(userId)
    } as IOrder;
    const created = await orderRepo.createNew(newOrder);
    // await cartRepo.deleteMulty(items, userId);
    if (paymentMethod === 'bank_transfer') {
      const checkoutURL = clientSepay.checkout.initCheckoutUrl();
      const checkoutFormfields = clientSepay.checkout.initOneTimePaymentFields({
        operation: 'PURCHASE',
        payment_method: 'BANK_TRANSFER',
        order_invoice_number: newOrder.orderNumber,
        order_amount: 20000,
        currency: 'VND',
        order_description: `Thanh toan don hang ${newOrder.orderNumber}`
        // success_url: 'https://example.com/order/DH123?payment=success',
        // error_url: 'https://example.com/order/DH123?payment=error',
        // cancel_url: 'https://example.com/order/DH123?payment=cancel'
      });
      return {
        form: `
            <form action="${checkoutURL}" method="POST" class="form-payment">
              ${(Object.keys(checkoutFormfields) as Array<keyof typeof checkoutFormfields>)
                .map(
                  (field) =>
                    `<input type="hidden" name="${field}" value="${checkoutFormfields[field]}" />`
                )
                .join('\n')}
              <button type="submit">Pay now</button>
            </form>
          `
      };
    } else {
      return {
        order: created
      };
    }
  };
  static changeStatus = async (
    data: {
      orderStatus: 'pending' | 'confirmed' | 'cancelled';
    },
    orderId: string
  ) => {
    const getOrder = await orderRepo.findOneById(orderId);
    if (!getOrder) throw new BAD_REQUEST('Order is not exist !');
    const { orderStatus } = data;
    if (orderStatus === 'cancelled') {
      const getDelivery = await deliveryRepo.getDeliveryByOrderId(getOrder._id.toString());
      if (!getDelivery) {
        throw new BAD_REQUEST('Cancel order failed !');
      }
      const updated = await orderRepo.changeStatus(orderStatus, orderId);
      if (!updated.matchedCount) throw new BAD_REQUEST('Cannot update order status !');
      const lalaMoveCancel = await lalaMoveProvider.cancelOrder(getDelivery.orderDeliveryId);
      return {
        updated,
        lalaMoveCancel
      };
    } else if (orderStatus === 'confirmed') {
      const updated = await orderRepo.changeStatus(orderStatus, orderId);
      if (!updated.matchedCount) throw new BAD_REQUEST('Cannot update order status !');
      const getRecipientAddress = await addressRepo.getAddressById(
        getOrder.deliveryAddress.toString(),
        getOrder.userId.toString()
      );
      if (!getRecipientAddress) throw new BAD_REQUEST('Address is not exist !');
      const getSenderAddress = await addressRepo.getAddressAdmin();
      if (!getSenderAddress) throw new BAD_REQUEST('Sender address is not exist !');

      const quotation = await lalaMoveProvider.quotationDetail(
        {
          address: getSenderAddress.streetAddress,
          coordinates: {
            lat: getSenderAddress.lat,
            lng: getSenderAddress.lng
          }
        },
        {
          address: getRecipientAddress.streetAddress,
          coordinates: {
            lat: getRecipientAddress.lat,
            lng: getRecipientAddress.lng
          }
        }
      );
      const sender = await userRepo.getAdminUser();
      if (!sender) throw new BAD_REQUEST('Sender is not exist !');
      const recipient = await userRepo.findOneById(getOrder.userId.toString());
      if (!recipient) throw new BAD_REQUEST('Recipient is not exist !');
      const orderDelivery = await lalaMoveProvider.createOrder(
        quotation,
        {
          name: sender.fullName,
          phone: sender.phoneNumber?.replace(/^0/, '+84') || ''
        },
        {
          name: recipient.fullName,
          phone: recipient.phoneNumber?.replace(/^0/, '+84') || ''
        },
        getOrder._id.toString()
      );
      const createOrderDelivery = await deliveryRepo.craeteNew({
        orderId: getOrder._id,
        orderDeliveryId: orderDelivery.orderId
      });
      return {
        createOrderDelivery,
        orderDelivery
      };
    }
  };
  static cancel = async (orderId: string, userId: string) => {
    const getOrder = await orderRepo.getOrderByUserId(orderId, userId);
    if (!getOrder) throw new BAD_REQUEST('Order is not exist !');
    if (getOrder.orderStatus === 'success')
      throw new BAD_REQUEST('Cannot cancel delivered order !');
    if (getOrder.orderStatus === 'confirmed') {
      const getDelivery = await deliveryRepo.getDeliveryByOrderId(orderId);
      if (!getDelivery) throw new BAD_REQUEST('Delivery info is not exist !');

      const updated = await orderRepo.changeStatus('cancelled', orderId);
      const cancelDelivery = await lalaMoveProvider.cancelOrder(
        getDelivery.orderDeliveryId.toString()
      );
      return {
        updated,
        cancelDelivery
      };
    }
    const updated = await orderRepo.changeStatus('cancelled', orderId);
    return updated;
  };
  static getListOrder = async (query: {
    limit: number;
    page: number;
    sortKey?: string | undefined;
    sortValue?: 1 | -1 | undefined;
  }) => {
    const { limit, page, sortKey, sortValue } = query;
    return await orderRepo.getListOrder({
      limit,
      page,
      sortKey,
      sortValue
    });
  };
  static getListOrderByUser = async (
    query: {
      limit: number;
      page: number;
      sortKey?: string | undefined;
      sortValue?: 1 | -1 | undefined;
    },
    userId: string
  ) => {
    const { limit, page, sortKey, sortValue } = query;
    return await orderRepo.getListOrderUser(
      {
        limit,
        page,
        sortKey,
        sortValue
      },
      userId
    );
  };
  static getDetail = async (orderId: string) => {
    return await orderRepo.getDetail(orderId);
  };
  static getDetailByUser = async (orderId: string, userId: string) => {
    return await orderRepo.getDetail(orderId, {
      userId: createObjectId(userId)
    });
  };
}
export default OrderService;
