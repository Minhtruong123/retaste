import { BAD_REQUEST } from '~/core/errors.response';
import { categoryRepo } from '~/models/repositories/category.repo';
import { productRepo } from '~/models/repositories/product.repo';
import { customSlug } from '~/utils/format';

class CategoryService {
  static create = async (data: {
    categoryName: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
  }) => {
    const created = await categoryRepo.createNew({
      ...data,
      categorySlug: customSlug(data.categoryName)
    });
    const newCategory = await categoryRepo.findOneById(created._id.toString());
    if (!newCategory) throw new BAD_REQUEST("Cann't craete new category !");
    return newCategory;
  };
  static update = async (
    data: {
      categoryName: string;
      description?: string;
      imageUrl?: string;
      isActive?: boolean;
    },
    id: string
  ) => {
    const { isActive } = data;
    const getCategory = await categoryRepo.findOneById(id);
    if (!getCategory) throw new BAD_REQUEST('Category is not exist !');
    const updated = await categoryRepo.update(
      {
        ...data,
        categorySlug: customSlug(data.categoryName)
      },
      id
    );
    if (!updated.matchedCount) throw new BAD_REQUEST("Cann't update category !");
    if (getCategory.isActive === false && isActive === true) {
      const updatedProd = await productRepo.restoreByCategoryId(id);
      if (!updatedProd.matchedCount) throw new BAD_REQUEST("Can't update category !");
    }
    if (getCategory.isActive === true && isActive === false) {
      const updatedProd = await productRepo.deactivateByCategoryId(id);
      if (!updatedProd.matchedCount) throw new BAD_REQUEST("Can't update category !");
    }
    return 'Update sucess !';
  };
  static getListCategory = async (query: {
    limit: number;
    page: number;
    keyWord: string;
    sortKey?: string | undefined;
    sortValue?: 1 | -1 | undefined;
  }) => {
    const { limit, page, keyWord, sortKey, sortValue } = query;
    return await categoryRepo.getListCategory({
      limit,
      page,
      keyWord,
      sortKey,
      sortValue
    });
  };
  static delete = async (id: string) => {
    const deleted = await categoryRepo.deleteById(id);
    if (!deleted.matchedCount) throw new BAD_REQUEST("Cann't delete category !");
    await productRepo.deleteByCategoryId(id);
    // if (!deletedProd.matchedCount) throw new BAD_REQUEST("Cann't delete category !");
    return deleted;
  };
  static getDetail = async (id: string) => {
    const getCategory = await categoryRepo.findOneById(id);
    if (!getCategory) throw new BAD_REQUEST('Category is not exist !');
    return getCategory;

    
  };
}
export default CategoryService;
