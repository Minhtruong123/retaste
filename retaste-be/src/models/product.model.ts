import { model, Schema, Types } from 'mongoose';
import { DOCUMENT_CATEGORY } from './category.model';

export const DOCUMENT_PRODUCT = 'Product';
const COLLECTION_NAME = 'products';

export interface IProduct {
  categoryId: Types.ObjectId;
  productName: string;
  productSlug: string;
  ratingCount: number;
  special?: string[];
  bestSeller: boolean;
  description?: string;
  basePrice: number;
  preparationTime: number;
  imageUrl?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: DOCUMENT_CATEGORY, required: true },
    productName: { type: String, required: true },
    productSlug: { type: String, required: true, unique: true },
    description: String,
    basePrice: { type: Number, required: true, min: 0 },
    preparationTime: { type: Number, required: true },
    imageUrl: String,
    isAvailable: { type: Boolean, default: true },
    ratingCount: { type: Number, required: true, min: 0, default: 0 },
    special: [
      {
        type: String
      }
    ],
    bestSeller: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

productSchema.index({ categoryId: 1 });
productSchema.index({ isDeleted: 1 });
productSchema.index({ isAvailable: 1, isFeatured: -1 });
const Product = model(DOCUMENT_PRODUCT, productSchema);

export const productModel = {
  COLLECTION_NAME,
  DOCUMENT_PRODUCT
};
export default Product;
