import { Schema, model } from 'mongoose';
import { DOCUMENT_USER } from './user.model';
export const DOCUMENT_ADDRESS = 'Address';
const COLLECTION_NAME = 'addresses';

export interface IAddress {
  user: Schema.Types.ObjectId;
  addressType?: 'home' | 'work' | 'other';
  streetAddress: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  location?: {
    type?: 'Point';
    coordinates: [number, number];
  };
  isDefault?: boolean;
  deliveryInstructions?: string;
  createdAt?: Date;
  isDeleted?: boolean;
}
const addressSchema = new Schema<IAddress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_USER,
      required: true
    },
    addressType: { type: String, enum: ['home', 'work', 'other'] },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere' }
    },
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
addressSchema.index({ email: 1 });
addressSchema.index({ phoneNumber: 1 });
addressSchema.index({ 'addresses.location': '2dsphere' });

const Address = model<IAddress>(DOCUMENT_USER, addressSchema);

export const userModel = {
  COLLECTION_NAME,
  DOCUMENT_USER
};
export default Address;