import { model, Schema, Types } from 'mongoose';
import { DOCUMENT_POSITION } from './position.model';
export const DOCUMENT_STAFF = 'Staff';
const COLLECTION_NAME = 'staffs';
export interface IStaff {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  positionId: Types.ObjectId;
  status?: 'active' | 'on_leave' | 'terminated' | 'suspended';
  password: string;
  avatar?: string;
  role?: 'staff';
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

const staffSchema = new Schema<IStaff>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    status: {
      type: String,
      enum: ['active', 'on_leave', 'terminated', 'suspended'],
      default: 'active'
    },
    positionId: { type: Schema.Types.ObjectId, ref: DOCUMENT_POSITION, required: true },
    avatar: String,
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'staff'
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

const Staff = model(DOCUMENT_STAFF, staffSchema);

export const staffModel = {
  COLLECTION_NAME,
  DOCUMENT_STAFF
};

export default Staff;
