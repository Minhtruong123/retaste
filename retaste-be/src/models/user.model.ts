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

  // addresses: IAddress[];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
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
    // addresses: [
    //   {
    //     addressType: { type: String, enum: ['home', 'work', 'other'] },
    //     streetAddress: { type: String, required: true },
    //     city: { type: String, required: true },
    //     state: { type: String },
    //     postalCode: { type: String },
    //     country: { type: String, required: true },
    //     location: {
    //       type: { type: String, enum: ['Point'], default: 'Point' },
    //       coordinates: { type: [Number], index: '2dsphere' }
    //     },
    //     isDefault: { type: Boolean, default: false },
    //     deliveryInstructions: { type: String },
    //     createdAt: { type: Date, default: Date.now }
    //   }
    // ],
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ 'addresses.location': '2dsphere' });

const User = model<IUser>(DOCUMENT_USER, userSchema);

export const userModel = {
  COLLECTION_NAME,
  DOCUMENT_USER
};
export default User;
