/**
 * create new cart
 * update quantity product in cart
 * delete product in cart
 * getCart user
 */

import { Types } from 'mongoose';
import { BAD_REQUEST } from '~/core/errors.response';
import { cartRepo } from '~/models/repositories/cart.repo';
import { customRepo, ICustomValid } from '~/models/repositories/custom.repo';
import { productRepo } from '~/models/repositories/product.repo';
import { sizeRepo } from '~/models/repositories/size.repo';
import { areCustomsEqual, createObjectId } from '~/utils/format';
import { checkSubset } from '~/utils/validations';

class CartService {
  static customIsValid = async (
    customAndOptionValid: ICustomValid[],
    customs: { customId: string; optionId: string; quantity?: number }[],
    productId: string
  ) => {
    if (customAndOptionValid.length !== customs.length) {
      throw new BAD_REQUEST('Option is not valid !');
    }
    const getCustomIdsRequire = (await customRepo.getCustomReuiredByProductId(productId)).map((i) =>
      i._id.toString()
    );
    const customIds = customs.map((c) => c.customId);
    // kiểm tra số lượng từng thành phần trong sản phẩm có hợp lệ
    const isSubset = checkSubset(getCustomIdsRequire, customIds);
    if (!isSubset) throw new BAD_REQUEST('Option is not valid !');
    // kiem tra xem option order co hop le hay khong
    for (const custom of customs) {
      for (const customDB of customAndOptionValid) {
        if (custom.customId === customDB._id.toString()) {
          const { options } = customDB;
          if (!options.maxQuantity && custom.quantity)
            throw new BAD_REQUEST('Option is not valid !');

          if (options.maxQuantity && options.minQuantity) {
            if (!custom.quantity) throw new BAD_REQUEST('Option is not valid !');
            if (custom.quantity < options.minQuantity)
              throw new BAD_REQUEST('Option is not valid !');
            if (custom.quantity > options.maxQuantity)
              throw new BAD_REQUEST('Option is not valid !');
          }
          break;
        }
      }
    }
  };
  static createNew = async (userId: string) => {
    const getCart = await cartRepo.findCartByUserId(userId);
    if (getCart) return getCart;
    const createdCart = await cartRepo.createNew(userId);
    if (!createdCart) throw new BAD_REQUEST("Cann't create cart user !");
    return createdCart;
  };
  static addToCart = async (
    data: {
      productId: string;
      sizeId: string;
      customs: { customId: string; optionId: string; quantity?: number }[];
      quantity: number;
    },
    userId: string
  ) => {
    const cartUser = await this.createNew(userId);
    const { productId, customs, sizeId, quantity } = data;
    const getProduct = await productRepo.findOneById(productId);
    if (!getProduct) throw new BAD_REQUEST('Product is not exist !');
    if (!getProduct.isAvailable) throw new BAD_REQUEST('Product is not available !');
    // kiem tra size tuong ung
    const getSize = await sizeRepo.findOneById(sizeId);
    if (!getSize) throw new BAD_REQUEST('Product is not valid !');
    if (!getSize.productId.equals(getProduct._id)) throw new BAD_REQUEST('Product is not valid !');
    // kiểm tra các customId required nhưng không tồn tại
    const customAndOptionValid: ICustomValid[] =
      await customRepo.getValidCustomizationsWithOptions(customs);
    // kiem tra custom co hop le hay khong
    await this.customIsValid(customAndOptionValid, customs, productId);

    // kiem tra xem san pham co trong gio hang hay chua
    const idxProduct = cartUser.products.findIndex((p) => p.productId.toString() === productId);
    const product: {
      productId: Types.ObjectId;
      sizeId: Types.ObjectId;
      customs: { customId: Types.ObjectId; optionId: Types.ObjectId; quantity?: number }[];
      quantity: number;
      createdAt: Date;
    } = {
      productId: getProduct._id,
      sizeId: getSize._id,
      quantity: quantity,
      createdAt: new Date(),
      customs: customs.map((i) => {
        if (i.quantity) {
          return {
            customId: createObjectId(i.customId),
            optionId: createObjectId(i.optionId),
            quantity: i.quantity
          };
        } else {
          return {
            customId: createObjectId(i.customId),
            optionId: createObjectId(i.optionId)
          };
        }
      })
    };
    if (idxProduct === -1) {
      await cartRepo.addProduct(userId, {
        data: product
      });
    } else {
      if (cartUser.products[idxProduct].sizeId.equals(product.sizeId)) {
        const productInCart = cartUser.products[idxProduct];
        const isExist = areCustomsEqual(
          {
            productId: productInCart.productId.toString(),
            customs: productInCart.customs.map((c) => {
              if (c.quantity)
                return {
                  customId: c.customId.toString(),
                  optionId: c.optionId.toString(),
                  quantity: c.quantity
                };
              else
                return {
                  customId: c.customId.toString(),
                  optionId: c.optionId.toString()
                };
            }),
            quantity: productInCart.quantity
          },
          customs
        );
        if (isExist) {
          await cartRepo.addProduct(userId, {
            index: idxProduct,
            data: {
              ...product,
              quantity: product.quantity + cartUser.products[idxProduct].quantity
            }
          });
        } else {
          await cartRepo.addProduct(userId, {
            data: product
          });
        }
      } else {
        await cartRepo.addProduct(userId, {
          data: product
        });
      }
    }
    return customAndOptionValid;
  };
  static updateQuantity = async (
    data: { id: string; action: 'subtract' | 'add' },
    userId: string
  ) => {
    const getCart = await cartRepo.findCartByUserId(userId);
    if (!getCart) throw new BAD_REQUEST('Request is not valid !');
    const { id, action } = data;
    const qty = action === 'add' ? 1 : -1;
    const idxProduct = getCart.products.findIndex((p) => p._id?.toString() === id);
    if (action === 'subtract' && getCart.products[idxProduct].quantity - qty === 0)
      throw new BAD_REQUEST("Can't delete product !");
    const updated = await cartRepo.updateQuantity(id, qty, userId);
    if (!updated.matchedCount) throw new BAD_REQUEST("Can't update quantity !");
    return 'Update successfully !';
  };
  static removeProduct = async (id: string, userId: string) => {
    const deleted = await cartRepo.removeProduct(id, userId);
    if (!deleted.matchedCount) throw new BAD_REQUEST('Update failed !');
    return 'Remove successfully !';
  };
  static getCartDetail = async (userId: string) => {
    return await cartRepo.getDetail(userId);
  };
}
export default CartService;
