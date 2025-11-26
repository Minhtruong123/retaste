import { BAD_REQUEST } from '~/core/errors.response';
import { IPosition } from '~/models/position.model';
import { positionRepo } from '~/models/repositories/position.repo';
import { staffRepo } from '~/models/repositories/staff.repo';

class PositionService {
  static create = async (data: {
    name: string;
    description?: string;
    status?: 'active' | 'inactive';
  }) => {
    const newPosition: IPosition = data;
    const isExist = await positionRepo.findOneByName(data.name);
    if (isExist) throw new BAD_REQUEST('Depart is already exist !');
    const created = await positionRepo.create(newPosition);
    if (!created) throw new BAD_REQUEST("Can't create new Position !");
    return created;
  };

  static update = async (
    data: {
      name: string;
      description?: string;
      status?: 'active' | 'inactive';
    },
    id: string
  ) => {
    const isExist = await positionRepo.findOneByName(data.name);
    if (isExist) throw new BAD_REQUEST('Depart is already exist !');
    const updated = await positionRepo.update(data, id);
    if (!updated.matchedCount) throw new BAD_REQUEST("Cann't update !");
    return updated;
  };

  static deleteById = async (id: string) => {
    const deletePosition = await positionRepo.deleteById(id);
    if (!deletePosition.matchedCount) throw new BAD_REQUEST("Can't delete position !");
    const deleteStaff = await staffRepo.deleteByPositionId(id);
    if (!deleteStaff.matchedCount) throw new BAD_REQUEST("Can't delete position !");
    return 'Delete position successfully !';
  };

  static getDetail = async (id: string) => {
    const result = await positionRepo.getDetail(id);
    if (!result) throw new BAD_REQUEST('');
    return result;
  };

  static getList = async (query: {
    limit: number;
    page: number;
    keyWord: string;
    sortKey?: string | undefined;
    sortValue?: 1 | -1 | undefined;
  }) => {
    const { limit, page, keyWord, sortKey, sortValue } = query;
    return await positionRepo.getList({
      limit,
      page,
      keyWord,
      sortKey,
      sortValue
    });
  };
}
export default PositionService;
