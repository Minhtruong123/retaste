import { BAD_REQUEST } from '~/core/errors.response';
import { customRepo } from '~/models/repositories/custom.repo';
import { optionRepo } from '~/models/repositories/option.repo';

class OptionService {
  static create = async (data: {
    customizationGroupId: string;
    optionName: string;
    basePrice?: number;
    unitType?: 'item' | 'ml' | 'gram' | 'oz' | 'custom';
    minQuantity?: number;
    maxQuantity?: number;
    defaultQuantity?: number;
    pricePerUnit: number;
  }) => {
    const getCustom = await customRepo.findOneById(data.customizationGroupId);
    if (!getCustom) throw new BAD_REQUEST('Product is not exist !');
    const createdNew = await optionRepo.createNew({
      ...data,
      customizationGroupId: getCustom._id
    });
    if (!createdNew) throw new BAD_REQUEST("Cann't create new size !");
    return 'Create successfully';
  };
  static getOption = async (productId: string) => {
    const option = optionRepo.getOptionByCustomId(productId);
    return option;
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
    const updated = await optionRepo.update(data, id);
    if (!updated) throw new BAD_REQUEST("Cann't update size !");
    return updated;
  };
  static delete = async (id: string) => {
    const deleted = await optionRepo.deleteById(id);
    if (!deleted) throw new BAD_REQUEST("Cann't delete size !");
    return deleted;
  };
}

export default OptionService;
