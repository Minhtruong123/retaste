import { Schema, model } from 'mongoose';

export const DOCUMENT_USER = 'User';
const COLLECTION_NAME = 'users';

// export interface IAddress {
//   addressType?: 'home' | 'work' | 'other';
//   streetAddress: string;
//   city: string;
//   state?: string;
//   postalCode?: string;
//   country: string;
//   location?: {
//     type?: 'Point';
//     coordinates: [number, number];
//   };
//   isDefault?: boolean;
//   deliveryInstructions?: string;
//   createdAt?: Date;
// }

export interface IUser {
  email: string;
  phoneNumber?: string;
  passwordHash: string;
  fullName: string;
  dateOfBirth?: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  verifyToken: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  role?: 'admin' | 'user' | 'employee';
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date },
    lastLoginAt: { type: Date },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    verifyToken: { type: String, required: true },

    isDeleted: {
      type: Boolean,
      default: false
    },
    role: { type: String, enum: ['admin', 'user', 'employee'], default: 'user' }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });

const User = model<IUser>(DOCUMENT_USER, userSchema);

export const userModel = {
  COLLECTION_NAME,
  DOCUMENT_USER
};
export default User;
