import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_CUSTOM_GROUP } from './customGroup.model';

export const DOCUMENT_OPTIONS = 'Option';
const COLLECTION_NAME = 'options';
export interface IProductOption {
  customizationGroupId: Types.ObjectId;
  optionName: string;
  basePrice?: number;
  unitType?: 'item' | 'ml' | 'gram' | 'oz' | 'custom';
  minQuantity?: number;
  maxQuantity?: number;
  defaultQuantity?: number;
  pricePerUnit?: number;
  caloriesPerUnit?: number;
  isAvailable?: boolean;
  displayOrder?: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const optionSchema = new Schema<IProductOption>(
  {
    customizationGroupId: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_CUSTOM_GROUP,
      required: true
    },
    optionName: { type: String, required: true },
    basePrice: { type: Number, default: 0 },
    unitType: {
      type: String,
      enum: ['item', 'ml', 'gram', 'oz', 'custom'],
      default: 'item'
    },
    minQuantity: { type: Number, default: 0 },
    maxQuantity: Number,
    defaultQuantity: Number,
    pricePerUnit: Number,
    caloriesPerUnit: Number,
    isAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

optionSchema.index({ customizationGroupId: 1 });
optionSchema.index({ isDeleted: 1 });

const Option = model<IProductOption>(DOCUMENT_OPTIONS, optionSchema);
export const optionModel = {
  COLLECTION_NAME,
  DOCUMENT_OPTIONS
};
export default Option;
