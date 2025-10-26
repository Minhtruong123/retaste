import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_PRODUCT } from './product.model';

export const DOCUMENT_CUSTOM_GROUP = 'Size';
const COLLECTION_NAME = 'sizes';
export interface ICustomizationGroup {
  productId: Types.ObjectId;
  sizeName: string;
  sizeValue?: string;
  priceModifier?: number;
  isDefault?: boolean;
  displayOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
const customizationGroupSchema = new Schema<ICustomizationGroup>(
  {
    productId: { type: Schema.Types.ObjectId, ref: DOCUMENT_PRODUCT, required: true },
    sizeName: { type: String, required: true },
    sizeValue: String,
    priceModifier: { type: Number, default: 0 },
    isDefault: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

const CustomizationGroup = model<ICustomizationGroup>(
  DOCUMENT_CUSTOM_GROUP,
  customizationGroupSchema
);
export default CustomizationGroup;
