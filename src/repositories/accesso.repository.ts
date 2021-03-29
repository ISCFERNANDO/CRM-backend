import { accessModel } from '../models';
import { AccessDTO } from './../dto/access.dto';

const getAllAccess = async function (): Promise<Array<any>> {
    return accessModel.where({ deleted: false });
};

const addAccess = async function (contract: AccessDTO): Promise<any> {
    return accessModel.create({ ...contract, deleted: false });
};

const updateAccess = async function (contract: AccessDTO): Promise<any> {
    return accessModel.findByIdAndUpdate(contract.id, contract);
};

const deleteAccess = async function (id: string): Promise<any> {
    return accessModel.findByIdAndUpdate(id, { deleted: true });
};

const findById = async function (id: string): Promise<any> {
    return accessModel.findById(id);
};

export { getAllAccess, addAccess, updateAccess, deleteAccess, findById };
