import { BAD_REQUEST } from '~/core/errors.response';
import { ICustomizationGroup } from '~/models/customGroup.model';
import { IProductOption } from '~/models/option.model';
import { IProduct } from '~/models/product.model';
import { categoryRepo } from '~/models/repositories/category.repo';
import { customRepo } from '~/models/repositories/custom.repo';
import { optionRepo } from '~/models/repositories/option.repo';
import { productRepo } from '~/models/repositories/product.repo';
import { sizeRepo } from '~/models/repositories/size.repo';
import { ISize } from '~/models/size.model';
import { createObjectId, customSlug } from '~/utils/format';

class CategoryService {
  static create = async (data: {
    categoryId: string;
    productName: string;
    description?: string;
    basePrice: number;
    preparationTime: number;
    imageUrl?: string;
    isAvailable?: boolean;
    isFeatured?: boolean;
    sizes: {
      sizeName: string;
      sizeValue?: string;
      priceModifier?: number;
      isDefault?: boolean;
      displayOrder?: number;
    }[];
    customizationGroups: {
      groupName: string;
      groupType: 'single_select' | 'multi_select' | 'quantity_based';
      isRequired?: boolean;
      minSelections?: number;
      maxSelections?: number;
      displayOrder?: number;
      options: {
        optionName: string;
        basePrice?: number;
        unitType?: 'item' | 'ml' | 'gram' | 'oz' | 'custom';
        minQuantity?: number;
        maxQuantity?: number;
        defaultQuantity?: number;
        pricePerUnit?: number;
        caloriesPerUnit?: number;
        isAvailable?: boolean;
        displayOrder?: number;
      }[];
    }[];
  }) => {
    const getCategory = await categoryRepo.findOneById(data.categoryId);
    if (!getCategory) throw new BAD_REQUEST('Category is not exist !');
    const newProduct: IProduct = {
      categoryId: createObjectId(data.categoryId),
      productName: data.productName,
      productSlug: customSlug(data.productName),
      description: data.description,
      basePrice: data.basePrice,
      preparationTime: data.preparationTime,
      imageUrl: data.imageUrl,
      isAvailable: data.isAvailable,
      isFeatured: data.isFeatured
    };
    const createdProduct = await productRepo.createNew(newProduct);
    if (!createdProduct) throw new BAD_REQUEST("Cann't create new product !");
    const size: ISize[] = [];
    data.sizes.forEach((item) =>
      size.push({
        ...item,
        productId: createdProduct._id
      })
    );
    const createdSize = await sizeRepo.createMany(size);
    if (!createdSize) throw new BAD_REQUEST("Cann't create new product !");
    const custom: ICustomizationGroup[] = [];
    data.customizationGroups.forEach((item) => {
      custom.push({
        ...item,
        productId: createdProduct._id
      });
    });
    const createdCustom = await customRepo.createMany(custom);
    if (!createdCustom) throw new BAD_REQUEST("Cann't create new product !");
    const option: IProductOption[] = [];
    let idx = 0;
    data.customizationGroups.forEach((i) => {
      i.options.forEach((o) => {
        option.push({
          ...o,
          customizationGroupId: createdCustom[idx]._id
        });
      });
      ++idx;
    });
    console.log(option);
    const createdOption = await optionRepo.createMany(option);
    if (!createdOption) throw new BAD_REQUEST("Cann't create new product !");
    return 'Create new product sucescfully !';
  };
  static update = async (
    data: {
      categoryId: string;
      productName: string;
      description?: string;
      basePrice: number;
      preparationTime: number;
      imageUrl?: string;
      isAvailable?: boolean;
    },
    id: string
  ) => {
    const getCategory = await categoryRepo.findOneById(data.categoryId);
    if (!getCategory) throw new BAD_REQUEST('Category is not exist !');
    const updated = await productRepo.update(
      {
        ...data,
        categoryId: createObjectId(data.categoryId),
        productSlug: customSlug(data.productName)
      },
      id
    );
    if (!updated.matchedCount) throw new BAD_REQUEST("Cann't update product !");
    return 'Update sucessfully !';
  };
  static getListProduct = async (query: {
    limit: number;
    page: number;
    keyWord: string;
    sortKey?: string | undefined;
    sortValue?: 1 | -1 | undefined;
  }) => {
    const { limit, page, keyWord, sortKey, sortValue } = query;
    return await productRepo.getListProduct({
      limit,
      page,
      keyWord,
      sortKey,
      sortValue
    });
  };
  static getDetail = async (id: string) => {
    const getProduct = await productRepo.getDetail(id);
    if (!getProduct) throw new BAD_REQUEST('Product is not exist !');
    return getProduct[0] || null;
  };
  static delete = async (id: string) => {
    const deletedProduct = await productRepo.deleteProduct(id);
    if (!deletedProduct) throw new BAD_REQUEST('Product is not exist !');
    const productId = deletedProduct._id.toString();
    if (!productId) throw new BAD_REQUEST("Cann't delete product !");
    const deletedSize = await sizeRepo.deleteByProductId(productId);
    if (!deletedSize.matchedCount) throw new BAD_REQUEST("Cann't delete product !");
    const deletedCustom = await customRepo.deleteByProductId(productId);
    if (!deletedCustom.matchedCount) throw new BAD_REQUEST("Cann't delete product !");
    const getCustom = await customRepo.findByProductId(productId);
    if (!getCustom) throw new BAD_REQUEST("Cann't delete product !");
    const deleteOption = await optionRepo.deleteByCustomId(getCustom._id.toString());
    if (!deleteOption.matchedCount) throw new BAD_REQUEST("Cann't delete product !");
    return 'Delete product successfully';
  };
}
export default CategoryService;
