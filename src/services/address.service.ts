import { AddressDTO } from '@/dto/address.dto';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { Messages } from '../constants/messages';
import { MultiServiciosAddressRepository } from '../repositories/address.repository';

export interface IAddressService {
    getAddressByCp(cp: string): Promise<AddressDTO | void>;
}

@Service()
export class AddressService implements IAddressService {
    constructor(private addressRepository: MultiServiciosAddressRepository) {}

    async getAddressByCp(cp: string): Promise<AddressDTO | void> {
        const data = await this.addressRepository.getAddressByCp(cp);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.CP_NOT_FOUND
            );
        }
        return data;
    }
}
