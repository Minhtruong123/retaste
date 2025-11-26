import { model, Schema } from 'mongoose';
export const DOCUMENT_DEPARTMENT = 'Department';
const COLLECTION_NAME = 'departments';

export interface IDepartment {
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);
const Department = model<IDepartment>(DOCUMENT_DEPARTMENT, departmentSchema);

export const departmentModel = {
  COLLECTION_NAME,
  DOCUMENT_DEPARTMENT
};
export default Department;
