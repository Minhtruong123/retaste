import { Schema, Types, model } from 'mongoose';
import { DOCUMENT_USER } from './user.model';
export const DOCUMENT_ADDRESS = 'Address';
const COLLECTION_NAME = 'addresses';

export interface IAddress {
  userId: Types.ObjectId;
  streetAddress: string;
  streetAddressSlug: string;
  city: string;
  detail: string;
  country: string;
  lat: string;
  lng: string;
  isDefault?: boolean;
  deliveryInstructions?: string;
  createdAt?: Date;
  isDeleted?: boolean;
}
const addressSchema = new Schema<IAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_USER,
      required: true
    },
    streetAddress: { type: String, required: true },
    streetAddressSlug: { type: String, required: true },
    city: { type: String, required: true },
    detail: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    deliveryInstructions: { type: String },
    createdAt: { type: Date, default: Date.now },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

const Address = model<IAddress>(DOCUMENT_ADDRESS, addressSchema);

export const addressModel = {
  COLLECTION_NAME,
  DOCUMENT_ADDRESS
};
export default Address;
