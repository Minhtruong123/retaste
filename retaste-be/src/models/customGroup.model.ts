import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_PRODUCT } from './product.model';

export const DOCUMENT_CUSTOM_GROUP = 'CustomizationGroup';
const COLLECTION_NAME = 'customization_groups';
export interface ICustomizationGroup {
  productId: Types.ObjectId;
  groupName: string;
  groupType: 'single_select' | 'multi_select' | 'quantity_based';
  isRequired?: boolean;
  minSelections?: number;
  maxSelections?: number;
  displayOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
const customizationGroupSchema = new Schema<ICustomizationGroup>(
  {
    productId: { type: Schema.Types.ObjectId, ref: DOCUMENT_PRODUCT, required: true },
    groupName: { type: String, required: true },
    groupType: {
      type: String,
      enum: ['single_select', 'multi_select', 'quantity_based'],
      required: true
    },
    isRequired: { type: Boolean, default: false },
    minSelections: { type: Number, default: 0 },
    maxSelections: Number,
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
