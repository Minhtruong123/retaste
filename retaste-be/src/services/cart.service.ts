/**
 * create new cart
 * update quantity product to cart
 * delete product in cart
 * getCart user
 */

import { ObjectId, Types } from 'mongoose';
import { BAD_REQUEST } from '~/core/errors.response';
import { cartRepo } from '~/models/repositories/cart.repo';
import { customRepo } from '~/models/repositories/custom.repo';
import { productRepo } from '~/models/repositories/product.repo';
import { sizeRepo } from '~/models/repositories/size.repo';
import { areCustomsEqual, createObjectId } from '~/utils/format';
import { checkSubset } from '~/utils/validations';

class CartService {
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
    const customAndOptionValid: {
      _id: ObjectId;
      groupName: string;
      isRequired: boolean;
      options: {
        _id: string;
        optionName: string;
        basePrice: number;
        unitType: string;
        minQuantity?: number;
        maxQuantity?: number;
        defaultQuantity: number;
        pricePerUnit: number;
        isAvailable: boolean;
      };
    }[] = await customRepo.getValidCustomizationsWithOptions(customs);
    // kiem tra custom co hop le hay khong
    // this.customIsValid(productId, customAndOptionValid, customs);
    if (customAndOptionValid.length !== customs.length)
      throw new BAD_REQUEST('Option is not valid !');
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
  static updateQuantity = async (data: { productId: string; createdAt: Date }, userId: string) => {
    const getCart = await cartRepo.findCartByUserId(userId);
    if (!getCart) throw new BAD_REQUEST('Request is not valid !');
    const { productId, createdAt } = data;
    const getProduct = await productRepo.findOneById(productId);
    if (!getProduct) throw new BAD_REQUEST('Product is not valid !');
    if (!getProduct.isAvailable) throw new BAD_REQUEST('Product is not valid !');
    const idxProduct = getCart.products.findIndex(
      (p) => p.productId.toString() === productId && p.createdAt === createdAt
    );
    if (idxProduct === -1) throw new BAD_REQUEST('Product is not exist in cart !');
    const updated = await cartRepo.addProduct(userId, {
      index: idxProduct,
      data: {
        ...getCart.products[idxProduct],
        quantity: getCart.products[idxProduct].quantity + 1
      }
    });
    if (!updated.matchedCount) throw new BAD_REQUEST('Update failed !');
    return 'Update successfully !';
  };
  static removeProduct = async (data: { productId: string; createdAt: Date }, userId: string) => {
    const getCart = await cartRepo.findCartByUserId(userId);
    if (!getCart) throw new BAD_REQUEST('Request is not valid !');
    const { productId, createdAt } = data;
    const idxProduct = getCart.products.findIndex(
      (p) => p.productId.toString() === productId && p.createdAt === createdAt
    );
    if (idxProduct === -1) throw new BAD_REQUEST('Product is not exist in cart !');
    const deleted = await cartRepo.removeProduct(userId, idxProduct);
    if (!deleted.matchedCount) throw new BAD_REQUEST('Update failed !');
    return 'Remove successfully !';
  };
  static getCartDetail = async (userId: string) => {
    return await cartRepo.getDetail(userId);
  };
}
export default CartService;
