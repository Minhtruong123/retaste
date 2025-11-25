import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_ORDER } from './order.model';

export const DOCUMENT_DELIVERY = 'Delivery';
const COLLECTION_NAME = 'deliveries';

export interface IDelivery {
  orderId: Types.ObjectId;
  orderDeliveryId: string;
  status?: 'pending' | 'success';
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const deliverySchema = new Schema<IDelivery>(
  {
    orderId: { type: Schema.Types.ObjectId, required: true, ref: DOCUMENT_ORDER },
    orderDeliveryId: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'success'], default: 'pending' }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

const Delivery = model<IDelivery>(DOCUMENT_DELIVERY, deliverySchema);

export const deliveryModel = {
  DOCUMENT_DELIVERY,
  COLLECTION_NAME
};

export default Delivery;
