import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_CUSTOM_GROUP } from './customGroup.model';
import { DOCUMENT_PRODUCT } from './product.model';
import { DOCUMENT_SIZE } from './size.model';
import { DOCUMENT_OPTIONS } from './option.model';
import { DOCUMENT_ADDRESS } from './address.model';

export const DOCUMENT_ORDER = 'Orders';
const COLLECTION_NAME = 'orders';

export interface IOrder {
  userId: Types.ObjectId;
  orderNumber: string;
  deliveryAddress: Types.ObjectId;
  orderStatus:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'cash' | 'bank_transfer';
  items: {
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
  }[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
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
      default: 'pending',
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
      required: true
    },
    paymentMethod: { type: String, enum: ['cash', 'bank_transfer'], required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: DOCUMENT_PRODUCT, required: true },
        sizeId: { type: Schema.Types.ObjectId, ref: DOCUMENT_SIZE, required: true },
        customs: [
          {
            customId: { type: Schema.Types.ObjectId, ref: DOCUMENT_CUSTOM_GROUP, required: true },
            optionId: { type: Schema.Types.ObjectId, ref: DOCUMENT_OPTIONS, required: true },
            quantity: { type: Number },
            basePrice: { type: Number, required: true },
            totalPrice: { type: Number, required: true }
          }
        ],
        quantity: { type: Number, default: 1, min: 1 },
        totalPrice: { type: Number, required: true }
      }
    ],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

const Order = model<IOrder>(DOCUMENT_ORDER, orderSchema);

export const orderModel = {
  DOCUMENT_ORDER,
  COLLECTION_NAME
};

export default Order;
