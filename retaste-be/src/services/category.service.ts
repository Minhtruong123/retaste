import { BAD_REQUEST } from '~/core/errors.response';
import { categoryRepo } from '~/models/repositories/category.repo';

class CategoryService {
  static create = async (data: {
    categoryName: string;
    categorySlug: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
  }) => {
    const created = await categoryRepo.createNew(data);
    const newCategory = await categoryRepo.findOneById(created._id.toString());
    if (!newCategory) throw new BAD_REQUEST("Cann't craete new category !");
    return newCategory;
  };
  static update = async (
    data: {
      categoryName: string;
      categorySlug: string;
      description?: string;
      imageUrl?: string;
      isActive?: boolean;
    },
    id: string
  ) => {
    const updated = await categoryRepo.update(data, id);
    if (!updated) throw new BAD_REQUEST("Cann't updaet category !");
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
    if (!deleted) throw new BAD_REQUEST("Cann't delete category !");
    return deleted;
  };
  static getDetail = async (id: string) => {
    const getCategory = await categoryRepo.findOneById(id);
    if (!getCategory) throw new BAD_REQUEST('Category is not exist !');
    return getCategory;
  };
}
export default CategoryService;
