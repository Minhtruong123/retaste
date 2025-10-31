import { BAD_REQUEST } from '~/core/errors.response';
import { productRepo } from '~/models/repositories/product.repo';
import { sizeRepo } from '~/models/repositories/size.repo';

class SizeService {
  static create = async (data: {
    productId: string;
    sizeName: string;
    sizeValue?: string;
    priceModifier?: number;
  }) => {
    const getProduct = await productRepo.findOneById(data.productId);
    if (!getProduct) throw new BAD_REQUEST('Product is not exist !');
    const createdNew = await sizeRepo.createNew({
      ...data,
      productId: getProduct._id
    });
    if (!createdNew) throw new BAD_REQUEST("Cann't create new size !");
    return 'Create successfully';
  };
  static getSize = async (productId: string) => {
    const sizes = sizeRepo.getSizeByProductId(productId);
    return sizes;
  };
  static update = async (
    data: {
      sizeName: string;
      sizeValue?: string;
      priceModifier?: number;
      isDefault?: boolean;
      displayOrder?: number;
    },
    id: string
  ) => {
    const updated = await sizeRepo.update(data, id);
    if (!updated) throw new BAD_REQUEST("Cann't update size !");
    return updated;
  };
  static delete = async (id: string) => {
    const deleted = await sizeRepo.deleteById(id);
    if (!deleted) throw new BAD_REQUEST("Cann't delete size !");
    return deleted;
  };
}
export default SizeService;
