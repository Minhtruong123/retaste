/**
 * create new cart
 * update quantity product to cart
 * delete product in cart
 * getCart user
 */

import { BAD_REQUEST } from '~/core/errors.response';
import { cartRepo } from '~/models/repositories/cart.repo';
import { customRepo } from '~/models/repositories/custom.repo';
import { productRepo } from '~/models/repositories/product.repo';
import { sizeRepo } from '~/models/repositories/size.repo';

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
    const cartUser = this.createNew(userId);
    const { productId, customs, sizeId } = data;
    const getProduct = await productRepo.findOneById(productId);
    if (!getProduct) throw new BAD_REQUEST('Product is not exist !');
    // kiem tra size tuong ung
    const getSize = await sizeRepo.findOneById(sizeId);
    if (!getSize) throw new BAD_REQUEST('Product is not valid !');
    if (!getSize.productId.equals(getProduct._id)) throw new BAD_REQUEST('Product is not valid !');
    // kiểm tra các customId required nhưng không tồn tại
    const customAndOptionValid = customRepo.getValidCustomizationsWithOptions(customs);
    // kiểm tra số lượng từng thành phần trong sản phẩm có hợp lệ

    // tạo và lưu sản phẩm
    return customAndOptionValid;
  };
}
export default CartService;
