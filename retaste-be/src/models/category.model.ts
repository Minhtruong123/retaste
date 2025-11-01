import { Schema, model, Types } from 'mongoose';
export const DOCUMENT_CATEGORY = 'Category';
const COLLECTION_NAME = 'categories';
export interface ICategory {
  categoryName: string;
  categorySlug: string;
  parentCategoryId?: Types.ObjectId | null;
  description?: string;
  imageUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    categoryName: { type: String, required: true },
    categorySlug: { type: String, required: true, unique: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: String,
    imageUrl: String,
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { collection: COLLECTION_NAME, timestamps: true }
);
categorySchema.index({ isDeleted: 1 });

const Category = model<ICategory>(DOCUMENT_CATEGORY, categorySchema);
export const categoryModel = {
  DOCUMENT_CATEGORY,
  COLLECTION_NAME
};
export default Category;
