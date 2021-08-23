import { Service } from 'typedi';
import { CustomerModel } from '../models';
import { CustomerDTO, TelefonoDTO } from './../dto/customer.dto';

export interface ICustomerRepository {
    getAllCustomers(): Promise<Array<any>>;
    addCustomer(contract: CustomerDTO): Promise<any>;
    updateCustomer(contract: CustomerDTO): Promise<any>;
    partialUpdateCustomer(contract: CustomerDTO): Promise<any>;
    deleteCustomer(id: string): Promise<any>;
    findById(id: string): Promise<any>;
    deleteByIds(ids: string[]): Promise<any>;
    filterByCompayNameOrRepresentativeName(subStr: string): Promise<Array<any>>;
}

@Service()
export class CustomerRepository implements ICustomerRepository {
    getAllCustomers = (): Promise<Array<any>> =>
        CustomerModel.where({ deleted: false });

    addCustomer = (contract: CustomerDTO): Promise<any> =>
        CustomerModel.create(this.customerDtoToModel(contract));

    updateCustomer = (contract: CustomerDTO): Promise<any> =>
        CustomerModel.findByIdAndUpdate(
            contract.id,
            this.customerDtoToModel(contract)
        );

    partialUpdateCustomer = (contract: CustomerDTO): Promise<any> =>
        CustomerModel.findByIdAndUpdate(contract.id, { ...contract });

    deleteCustomer = (id: string): Promise<any> =>
        CustomerModel.findByIdAndUpdate(id, { deleted: true });

    findById = (id: string): Promise<any> =>
        CustomerModel.findById(id).where({ deleted: false });

    deleteByIds(ids: string[]): Promise<any> {
        const promises = ids.map(this.deleteCustomer);
        return Promise.all(promises);
    }

    filterByCompayNameOrRepresentativeName = (
        subStr: string
    ): Promise<Array<any>> =>
        CustomerModel.aggregate([
            {
                $addFields: {
                    fullNameFilter: {
                        $concat: [
                            '$representante.name',
                            '$representante.firstSurname',
                            '$representante.secondSurname'
                        ]
                    }
                }
            },
            {
                $match: {
                    deleted: false,
                    $or: [
                        {
                            fullNameFilter: {
                                $regex: `.*${subStr}.*`
                            }
                        },
                        {
                            nombreEmpresa: {
                                $regex: `.*${subStr}.*`
                            }
                        }
                    ]
                }
            }
        ]).exec();

    private customerDtoToModel(contract: CustomerDTO): any {
        return {
            tipoPersona: contract.tipoPersona,
            razonSocial: contract.razonSocial,
            nombreEmpresa: contract.nombreEmpresa,
            sitioWeb: contract.sitioWeb,
            photoUrl: contract.photoUrl,
            active: contract.active,
            telefonos: contract.telefonos.map(this.mapTelefono),
            representante: contract.representante,
            direccion: contract.direccion,
            deleted: false
        };
    }

    private mapTelefono(telefono: TelefonoDTO) {
        return {
            tipoTelefono: telefono.tipoTelefono,
            telefono: telefono.telefono,
            extension: telefono.extension
        };
    }
}
