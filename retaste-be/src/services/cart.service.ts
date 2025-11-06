/**
 * create new cart
 * update quantity product to cart
 * delete product in cart
 * getCart user
 */

import { ObjectId } from 'mongoose';
import { BAD_REQUEST } from '~/core/errors.response';
import { ICart } from '~/models/cart.model';
import { cartRepo } from '~/models/repositories/cart.repo';
import { customRepo } from '~/models/repositories/custom.repo';
import { productRepo } from '~/models/repositories/product.repo';
import { sizeRepo } from '~/models/repositories/size.repo';
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
    const { productId, customs, sizeId } = data;
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
      }[];
    }[] = await customRepo.getValidCustomizationsWithOptions(customs);
    if (customAndOptionValid.length != customs.length)
      throw new BAD_REQUEST('Option is not valid !');
    const getCustomIdsRequire = (await customRepo.getCustomByProductId(productId)).map((i) =>
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
          if (!options[0].maxQuantity && custom.quantity)
            throw new BAD_REQUEST('Option is not valid !');

          if (options[0].maxQuantity && options[0].minQuantity) {
            if (!custom.quantity) throw new BAD_REQUEST('Option is not valid !');
            if (custom.quantity < options[0].minQuantity)
              throw new BAD_REQUEST('Option is not valid !');
            if (custom.quantity > options[0].maxQuantity)
              throw new BAD_REQUEST('Option is not valid !');
          }
          break;
        }
      }
    }
    // kiem tra xem san pham co trong gio hang hay chua
    if (cartUser.products.some((p) => p.productId.toString() === productId)) {
      //
    } else {
      //
    }
    return customAndOptionValid;
  };
}
export default CartService;
