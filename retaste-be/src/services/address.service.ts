import axios from 'axios';
import { BAD_REQUEST } from '~/core/errors.response';
import { IAddress } from '~/models/address.model';
import { addressRepo } from '~/models/repositories/address.repo';
import { createObjectId, customSlug } from '~/utils/format';

class AddressService {
  static addressIsValid = async (address: string) => {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: `${address} , Đà Nẵng, Vietnam`,
        format: 'json',
        limit: 1,
        countrycodes: 'vn'
      },
      headers: {
        'User-Agent': 'YourAppName/1.0'
      }
    }) as { data: any[] };
    if (response.data.length > 0) {
      const result = response.data[0];
      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);
      const isDaNang = lat >= 15.9 && lat <= 16.3 && lon >= 107.9 && lon <= 108.3;
      if (!isDaNang) throw new BAD_REQUEST('Address is not exist in Da Nang !');
      return {
        exists: isDaNang,
        displayName: result.display_name,
        coordinates: { lat, lon }
      };
    } else {
      throw new BAD_REQUEST('Address is not exist in Da Nang !');
    }
  };
  static createNew = async (
    data: {
      streetAddress: string;
      isDefault: boolean;
    },
    userId: string
  ) => {
    const { streetAddress, isDefault } = data;
    const addressIsExist = await addressRepo.findAddressByStreet(streetAddress, userId);
    if (addressIsExist) throw new BAD_REQUEST('Address is exist !');
    const result = await this.addressIsValid(streetAddress);
    const newAddres: IAddress = {
      userId: createObjectId(userId),
      city: 'Da Nang',
      detail: result.displayName,
      country: 'Viet Nam',
      streetAddressSlug: customSlug(streetAddress),
      streetAddress
    };
    if (isDefault) {
      newAddres.isDefault = true;
      const getExistDefaultAddress = await addressRepo.isDefault(userId);
      if (getExistDefaultAddress) {
        const updateOldAddress = await addressRepo.udpate(
          {
            isDefault: false
          },
          getExistDefaultAddress._id.toString(),
          userId
        );
        if (!updateOldAddress.matchedCount) throw new BAD_REQUEST("Cann't create new address!");
        const created = await addressRepo.createNew(newAddres);
        return created;
      } else {
        const created = await addressRepo.createNew(newAddres);
        return created;
      }
    } else {
      const created = await addressRepo.createNew(newAddres);
      return created;
    }
  };
  static getListAddress = async (query: {
    limit: number;
    page: number;
    keyWord: string;
    sortKey?: string | undefined;
    sortValue?: 1 | -1 | undefined;
  }) => {
    const { limit, page, keyWord, sortKey, sortValue } = query;
    return await addressRepo.getListAddress({
      limit,
      page,
      keyWord,
      sortKey,
      sortValue
    });
  };
  static deleteById = async (id: string, userId: string) => {
    const deleted = await addressRepo.deleteById(id, userId);
    if (!deleted.matchedCount) throw new BAD_REQUEST('Delete failure !');
    return 'Delete address successfully !';
  };
  static getDetail = async (id: string, userId: string) => {
    return (await addressRepo.getDetail(id, userId)) || {};
  };
  static update = async (
    data: {
      streetAddress: string;
      isDefault: boolean;
    },
    id: string,
    userId: string
  ) => {
    const { streetAddress, isDefault } = data;
    const result = await this.addressIsValid(streetAddress);
    const newAddres: IAddress = {
      userId: createObjectId(userId),
      city: 'Da Nang',
      detail: result.displayName,
      country: 'Viet Nam',
      streetAddressSlug: customSlug(streetAddress),
      streetAddress
    };
    if (isDefault) {
      newAddres.isDefault = true;
      const getExistDefaultAddress = await addressRepo.isDefault(userId);
      if (getExistDefaultAddress) {
        const updateOldAddress = await addressRepo.udpate(
          {
            isDefault: false
          },
          getExistDefaultAddress._id.toString(),
          userId
        );
        if (!updateOldAddress.matchedCount) throw new BAD_REQUEST("Cann't update successfully !");
        const updated = await addressRepo.udpate(newAddres, id, userId);
        if (!updated.matchedCount) throw new BAD_REQUEST('Update failure !');
        return 'Update successfully !';
      } else {
        const updated = await addressRepo.udpate(newAddres, id, userId);
        if (!updated.matchedCount) throw new BAD_REQUEST('Update failure !');
        return 'Update successfully !';
      }
    } else {
      const updated = await addressRepo.udpate(newAddres, id, userId);
      if (!updated.matchedCount) throw new BAD_REQUEST('Update failure !');
      return 'Update successfully !';
    }
  };
}

export default AddressService;
