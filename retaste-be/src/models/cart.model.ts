import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_USER } from './user.model';
import { DOCUMENT_PRODUCT } from './product.model';
import { DOCUMENT_SIZE } from './size.model';
import { DOCUMENT_CUSTOM_GROUP } from './customGroup.model';
import { DOCUMENT_OPTIONS } from './option.model';
export const DOCUMENT_CART = 'Cart';
const COLLECTION_NAME = 'carts';

export interface ICart {
  userId: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    sizeId: Types.ObjectId;
    customs: { customId: Types.ObjectId; optionId: Types.ObjectId; quantity?: number }[];
    quantity: number;
  }[];
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: DOCUMENT_USER, required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: DOCUMENT_PRODUCT, required: true },
        sizeId: { type: Schema.Types.ObjectId, ref: DOCUMENT_SIZE },
        customs: [
          {
            customId: { type: Schema.Types.ObjectId, ref: DOCUMENT_CUSTOM_GROUP },
            optionId: { type: Schema.Types.ObjectId, ref: DOCUMENT_OPTIONS },
            quantity: { type: Number, default: 1 }
          }
        ],
        quantity: { type: Number, default: 1, min: 1 }
      }
    ]
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

const Cart = model<ICart>(DOCUMENT_CART, cartSchema);
export default Cart;
