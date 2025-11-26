import { BAD_REQUEST, UNAUTHORIZED } from '~/core/errors.response';
import bcrypt from 'bcryptjs';
import { createObjectId, pickUser } from '~/utils/format';
import { IStaff } from '~/models/staff.model';
import { staffRepo } from '~/models/repositories/staff.repo';
import { positionRepo } from '~/models/repositories/position.repo';
import { JwtProvider } from '~/providers/jwt.provider';
import env from '~/configs/environments';
/**
 * crud Employee
 */
class EmployeeService {
  static create = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    positionId: string;
    employmentStatus?: 'active' | 'on_leave' | 'terminated' | 'suspended';
    avatar?: string;
  }) => {
    const { email, positionId } = data;
    const isExist = await staffRepo.findOneByEmail(email);
    if (isExist) throw new BAD_REQUEST('Email is alreadt exist !');
    const getPosition = await positionRepo.findOneById(positionId);
    if (!getPosition) throw new BAD_REQUEST('Position is not exist !');
    const password = 'Password123!';
    const newStaff: IStaff = {
      firstName: data.firstName,
      lastName: data.lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      phoneNumber: data.phoneNumber ? data.phoneNumber : '',
      role: 'staff',
      avatar: data.avatar ? data.avatar : '',
      positionId: createObjectId(positionId)
    };
    const created = await staffRepo.create(newStaff);
    if (!created) throw new BAD_REQUEST("Cann't create new staff !");
    return created;
  };

  static update = async (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber?: string;
      positionId: string;
      employmentStatus?: 'active' | 'on_leave' | 'terminated' | 'suspended';
      avatar?: string;
    },
    staffId: string
  ) => {
    const { email, positionId } = data;
    const getPosition = await positionRepo.findOneById(positionId);
    if (!getPosition) throw new BAD_REQUEST('Position is not exist !');
    const newStaff: Partial<IStaff> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email,
      phoneNumber: data.phoneNumber ? data.phoneNumber : '',
      role: 'staff',
      avatar: data.avatar ? data.avatar : '',
      positionId: createObjectId(positionId)
    };
    const updated = await staffRepo.update(newStaff, staffId);
    if (!updated.matchedCount) throw new BAD_REQUEST("Cann't update staff !");
    return updated;
  };

  static updateByStaff = async (
    data: {
      firstName: string;
      lastName: string;
      phoneNumber?: string;
      avatar?: string;
      password?: string;
    },
    staffId: string
  ) => {
    const newStaff: Partial<IStaff> = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber ? data.phoneNumber : '',
      role: 'staff',
      avatar: data.avatar ? data.avatar : ''
    };
    const updated = await staffRepo.update(newStaff, staffId);
    if (!updated.matchedCount) throw new BAD_REQUEST("Cann't update !");
    return updated;
  };

  static deleteById = async (id: string) => {
    const deleted = await staffRepo.deleteById(id);
    if (!deleted.matchedCount) throw new BAD_REQUEST("Can't delete staff !");
    return deleted;
  };

  static getList = async (query: {
    limit: number;
    page: number;
    keyWord: string;
    sortKey?: string | undefined;
    sortValue?: 1 | -1 | undefined;
  }) => {
    const { limit, page, keyWord, sortKey, sortValue } = query;
    return await staffRepo.getList({
      limit,
      page,
      keyWord,
      sortKey,
      sortValue
    });
  };

  static getDetail = async (id: string) => {
    const result = await staffRepo.getDetail(id);
    if (!result) throw new BAD_REQUEST('Staff is not exist !');
    return result;
  };

  static login = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const getStaff = await staffRepo.findOneByEmail(email, {
      status: 'active'
    });
    if (!getStaff) throw new BAD_REQUEST('Staff is not exist !');
    if (!bcrypt.compareSync(password, getStaff.password))
      throw new UNAUTHORIZED('Password or email is not correct !');
    const payload = {
      staffId: getStaff._id.toString(),
      email: getStaff.email,
      role: getStaff.role
    };
    const accessToken = await JwtProvider.generateToken(
      payload,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    );
    const refreshToken = await JwtProvider.generateToken(
      payload,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      env.REFRESH_TOKEN_LIFE
    );
    return {
      accessToken,
      refreshToken,
      user: pickUser(getStaff, ['email', 'phoneNumber', 'firstName', 'lastName', 'avatar'])
    };
  };

  static refreshToken = async (refreshToken: string) => {
    const decoded = JwtProvider.verifyToken(
      refreshToken,
      env.REFRESH_TOKEN_SECRET_SIGNATURE
    ) as Staff;
    if (!decoded) throw new UNAUTHORIZED();
    const payload = {
      staffId: decoded.staffId,
      email: decoded.email,
      role: decoded.role
    };
    const accessToken = JwtProvider.generateToken(
      payload,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    );
    return { accessToken };
  };
}
export default EmployeeService;
