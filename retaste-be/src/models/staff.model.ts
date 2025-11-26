import { model, Schema } from 'mongoose';
export const DOCUMENT_STAFF = 'Staff';
const COLLECTION_NAME = 'staffs';
export interface IStaff {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  hireDate: Date;
  terminationDate?: Date;
  employmentStatus?: 'active' | 'on_leave' | 'terminated' | 'suspended';
  password: string;
  jobTitle?: string;
  hourlyRate?: number;
  avatar: string;
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

    hireDate: { type: Date, required: true },
    terminationDate: Date,
    employmentStatus: {
      type: String,
      enum: ['active', 'on_leave', 'terminated', 'suspended'],
      default: 'active'
    },
    avatar: String,
    jobTitle: String,
    // department: String,
    hourlyRate: Number,
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
