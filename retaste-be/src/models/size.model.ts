import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_PRODUCT } from './product.model';

export const DOCUMENT_SIZE = 'Size';
const COLLECTION_NAME = 'sizes';
export interface ISize {
  productId: Types.ObjectId;
  sizeName: string;
  sizeValue?: string;
  priceModifier?: number;
  isDefault?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
const sizeSchema = new Schema<ISize>(
  {
    productId: { type: Schema.Types.ObjectId, ref: DOCUMENT_PRODUCT, required: true },
    sizeName: { type: String, required: true },
    sizeValue: String,
    priceModifier: { type: Number, default: 0 },
    isDefault: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);
sizeSchema.index({ productId: 1 });
sizeSchema.index({ isDeleted: 1 });

const Size = model<ISize>(DOCUMENT_SIZE, sizeSchema);

export const sizeModel = {
  COLLECTION_NAME,
  DOCUMENT_SIZE
};
export default Size;
