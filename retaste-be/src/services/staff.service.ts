import { BAD_REQUEST } from '~/core/errors.response';
import { userRepo } from '~/models/repositories/user.repo';
import { IUser } from '~/models/user.model';
import bcrypt from 'bcryptjs';
import { createObjectId } from '~/utils/format';
/**
 * crud Employee
 */
class EmployeeService {
  static create = async (data: { email: string; phoneNumber?: string; fullName: string }) => {
    const { email } = data;
    const getUser = await userRepo.findOneByEmail(email);
    if (getUser) throw new BAD_REQUEST('User is already exist !');
    const newPassowrd = bcrypt.hashSync('Password123!', 10);
    const newEmployee: IUser = {
      email,
      phoneNumber: data.phoneNumber,
      fullName: data.fullName,
      isActive: true,
      verifyToken: null,
      emailVerified: true,
      phoneVerified: true,
      role: 'employee',
      passwordHash: newPassowrd
    };
    const createNew = await userRepo.createNew(newEmployee);
    return createNew;
  };
  static updateByEmployee = async (
    data: { phoneNumber?: string; fullName: string },
    employeeId: string
  ) => {
    const getUser = await userRepo.findOneById(employeeId);
    if (getUser) throw new BAD_REQUEST('Email user is already exist !');
    const newUser: Partial<IUser> = {
      phoneNumber: data.phoneNumber,
      fullName: data.fullName
    };
    const updated = await userRepo.update(newUser, employeeId);
    if (!updated.matchedCount) throw new BAD_REQUEST("Cann't update Employee !");
    return updated;
  };
  static update = async (data: { phoneNumber?: string; fullName: string; employeeId: string }) => {
    const newUser: Partial<IUser> = {
      phoneNumber: data.phoneNumber,
      fullName: data.fullName
    };
    const updated = await userRepo.update(newUser, data.employeeId);
    if (!updated.matchedCount) throw new BAD_REQUEST("Cann't update Employee !");
    return updated;
  };
  static deleteEmployee = async (employeeId: string) => {
    return await userRepo.deleteEmployee(employeeId);
  };
  static getListEmployee = async () => {};
}
export default EmployeeService;
