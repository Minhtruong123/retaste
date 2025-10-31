import { BAD_REQUEST } from '~/core/errors.response';
import { customRepo } from '~/models/repositories/custom.repo';
import { productRepo } from '~/models/repositories/product.repo';

class CustomService {
  static create = async (data: {
    productId: string;
    groupName: string;
    groupType: 'single_select' | 'multi_select' | 'quantity_based';
    isRequired?: boolean;
    minSelections?: number;
    maxSelections?: number;
    displayOrder?: number;
  }) => {
    const getProduct = await productRepo.findOneById(data.productId);
    if (!getProduct) throw new BAD_REQUEST('Product is not exist !');
    const createdNew = await customRepo.createNew({
      ...data,
      productId: getProduct._id
    });
    if (!createdNew) throw new BAD_REQUEST("Cann't create new size !");
    return 'Create successfully';
  };
  static getCustom = async (productId: string) => {
    const custom = customRepo.getCustomByProductId(productId);
    return custom;
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
    const updated = await customRepo.update(data, id);
    if (!updated) throw new BAD_REQUEST("Cann't update size !");
    return updated;
  };
  static delete = async (id: string) => {
    const deleted = await customRepo.deleteById(id);
    if (!deleted) throw new BAD_REQUEST("Cann't delete size !");
    return deleted;
  };
}
export default CustomService;
