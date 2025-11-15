import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_CUSTOM_GROUP } from './customGroup.model';
import { DOCUMENT_PRODUCT } from './product.model';
import { DOCUMENT_SIZE } from './size.model';
import { DOCUMENT_OPTIONS } from './option.model';
import { DOCUMENT_ADDRESS } from './address.model';

export const DOCUMENT_ORDER = 'Orders';
const COLLECTION_NAME = 'orders';
export interface IOrder {
  userid: Types.ObjectId;
  products: [];
  totalAmout: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderNumber: { type: String, required: true, unique: true },

    deliveryAddress: { type: Schema.Types.ObjectId, ref: DOCUMENT_ADDRESS, required: true },
    orderStatus: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'out_for_delivery',
        'delivered',
        'cancelled'
      ],
      required: true,
      default: 'pending'
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      required: true,
      default: 'pending'
    },

    paymentMethod: { type: String, required: true, enum: ['1', '2'] },

    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: DOCUMENT_PRODUCT, required: true },
        sizeId: { type: Schema.Types.ObjectId, ref: DOCUMENT_SIZE },
        customs: [
          {
            customId: { type: Schema.Types.ObjectId, ref: DOCUMENT_CUSTOM_GROUP },
            optionId: { type: Schema.Types.ObjectId, ref: DOCUMENT_OPTIONS },
            quantity: { type: Number },
            optionPrice: { type: Number, required: true },
            unitPrice: { type: Number, required: true }
          }
        ],
        quantity: { type: Number, default: 1, min: 1 },
        totalPrice: { type: Number, required: true }
      }
    ],

    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
  },
  { collection: COLLECTION_NAME, timestamps: true }
);
const Order = model<IOrder>(DOCUMENT_ORDER, orderSchema);
export const orderModel = {
  DOCUMENT_ORDER,
  COLLECTION_NAME
};
export default Order;
