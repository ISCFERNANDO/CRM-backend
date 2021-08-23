import { NextFunction } from 'express';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { CustomerRepository } from '../repositories/customer.repository';
import { HttpStatus } from './../constants/http-status';
import { Messages } from './../constants/messages';
import { CustomerDTO } from './../dto/customer.dto';

export interface ICustomerService {
    getAllCustomers(next: NextFunction): Promise<CustomerDTO[] | void>;
    addCustomer(contract: CustomerDTO): Promise<CustomerDTO | void>;
    updateCustomer(contract: CustomerDTO): Promise<CustomerDTO | void>;
    partialUpdateCustomer(contract: CustomerDTO): Promise<CustomerDTO | void>;
    deleteCustomer(id: string): Promise<boolean | void>;
    findById(id: string): Promise<CustomerDTO | void>;
    deleteByIds(ids: string[]): Promise<boolean | void>;
    filterByCompayNameOrRepresentativeName(
        subStr: string
    ): Promise<CustomerDTO[] | void>;
}

@Service()
export class CustomerService implements ICustomerService {
    constructor(private customerRepository: CustomerRepository) {}

    async getAllCustomers(): Promise<void | CustomerDTO[]> {
        const customers = await this.customerRepository.getAllCustomers();
        return customers.map(this.mapCustomer);
    }

    async addCustomer(contract: CustomerDTO): Promise<void | CustomerDTO> {
        const data = await this.customerRepository.addCustomer(contract);
        contract.id = data._id;
        return contract;
    }

    async updateCustomer(contract: CustomerDTO): Promise<void | CustomerDTO> {
        const data = await this.customerRepository.updateCustomer(contract);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.CUSTOMER_NOT_FOUND
            );
        }
        contract.id = data._id;
        return contract;
    }

    async partialUpdateCustomer(
        contract: CustomerDTO
    ): Promise<void | CustomerDTO> {
        const data = await this.customerRepository.partialUpdateCustomer(
            contract
        );
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.CUSTOMER_NOT_FOUND
            );
        }
        contract.id = data._id;
        return contract;
    }

    async deleteCustomer(id: string): Promise<boolean | void> {
        if (!(await this.customerRepository.findById(id))) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.CUSTOMER_NOT_FOUND
            );
        }
        await this.customerRepository.deleteCustomer(id);
        return true;
    }

    async findById(id: string): Promise<void | CustomerDTO> {
        const data = await this.customerRepository.findById(id);
        return this.mapCustomer(data);
    }

    async deleteByIds(ids: string[]): Promise<boolean | void> {
        await this.customerRepository.deleteByIds(ids);
        return true;
    }

    async filterByCompayNameOrRepresentativeName(
        subStr: string
    ): Promise<void | CustomerDTO[]> {
        const customers = await this.customerRepository.filterByCompayNameOrRepresentativeName(
            subStr
        );
        return customers.map(this.mapCustomer);
    }

    private mapCustomer(customer: any): CustomerDTO {
        const telefonos: any[] = customer.telefonos;
        return {
            id: customer._id,
            tipoPersona: customer.tipoPersona,
            razonSocial: customer.razonSocial,
            nombreEmpresa: customer.nombreEmpresa,
            sitioWeb: customer.sitioWeb,
            photoUrl: customer.photoUrl,
            active: customer.active,
            telefonos: telefonos.map((t: any) => ({
                tipoTelefono: 1,
                telefono: t.telefono,
                extension: t.extension
            })),
            representante: {
                name: customer.representante.name,
                firstSurname: customer.representante.firstSurname,
                secondSurname: customer.representante.secondSurname,
                email: customer.representante.email
            },
            direccion: {
                codigoPostal: customer.direccion.codigoPostal,
                pais: customer.direccion.pais,
                estado: customer.direccion.estado,
                colonia: customer.direccion.colonia,
                calle: customer.direccion.calle,
                numeroExterior: customer.direccion.numeroExterior,
                numeroInterior: customer.direccion.numeroInterior
            }
        };
    }
}
