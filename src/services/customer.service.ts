import { NextFunction } from 'express';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { CustomerRepository } from '../repositories/customer.repository';
import { HttpStatus } from './../constants/http-status';
import { Messages } from './../constants/messages';
import { CustomerDTO } from './../dto/customer.dto';

export interface ICustomerService {
    getAllCustomers(next: NextFunction): Promise<CustomerDTO[] | void>;
    addCustomer(
        contract: CustomerDTO,
        next: NextFunction
    ): Promise<CustomerDTO | void>;
    updateCustomer(
        contract: CustomerDTO,
        next: NextFunction
    ): Promise<CustomerDTO | void>;
    partialUpdateCustomer(
        contract: CustomerDTO,
        next: NextFunction
    ): Promise<CustomerDTO | void>;
    deleteCustomer(id: string, next: NextFunction): Promise<boolean | void>;
    findById(id: string, next: NextFunction): Promise<CustomerDTO | void>;
    deleteByIds(ids: string[], next: NextFunction): Promise<boolean | void>;
}

@Service()
export class CustomerService implements ICustomerService {
    constructor(private customerRepository: CustomerRepository) {}

    async getAllCustomers(next: NextFunction): Promise<void | CustomerDTO[]> {
        try {
            const customers = await this.customerRepository.getAllCustomers();
            return customers.map(this.mapCustomer);
        } catch (error) {
            console.log('errors ==> ', error);
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.GET_CUSTOMER_ERROR
                )
            );
        }
    }

    async addCustomer(
        contract: CustomerDTO,
        next: NextFunction
    ): Promise<void | CustomerDTO> {
        try {
            const data = await this.customerRepository.addCustomer(contract);
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_CUSTOMER_ERROR
                )
            );
        }
    }

    async updateCustomer(
        contract: CustomerDTO,
        next: NextFunction
    ): Promise<void | CustomerDTO> {
        try {
            const data = await this.customerRepository.updateCustomer(contract);
            if (!data) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.CUSTOMER_NOT_FOUND
                    )
                );
                return;
            }
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_CUSTOMER_ERROR
                )
            );
        }
    }

    async partialUpdateCustomer(
        contract: CustomerDTO,
        next: NextFunction
    ): Promise<void | CustomerDTO> {
        try {
            const data = await this.customerRepository.partialUpdateCustomer(
                contract
            );
            if (!data) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.CUSTOMER_NOT_FOUND
                    )
                );
                return;
            }
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_CUSTOMER_ERROR
                )
            );
        }
    }

    async deleteCustomer(
        id: string,
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            if (!(await this.customerRepository.findById(id))) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.CUSTOMER_NOT_FOUND
                    )
                );
                return;
            }
            await this.customerRepository.deleteCustomer(id);
            return true;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.DELETE_CUSTOMER_ERROR
                )
            );
        }
    }

    async findById(
        id: string,
        next: NextFunction
    ): Promise<void | CustomerDTO> {
        try {
            const data = await this.customerRepository.findById(id);
            return this.mapCustomer(data);
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.CUSTOMER_NOT_FOUND
                )
            );
        }
    }

    async deleteByIds(
        ids: string[],
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            await this.customerRepository.deleteByIds(ids);
            return true;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.CUSTOMER_NOT_FOUND
                )
            );
        }
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
