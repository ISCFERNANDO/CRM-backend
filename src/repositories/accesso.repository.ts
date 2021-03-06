import { AccessModel } from '../models';
import { AccessDTO } from './../dto/access.dto';

const getAllAccess = async function (): Promise<Array<any>> {
    return AccessModel.where({ deleted: false });
};

const addAccess = async function (contract: AccessDTO): Promise<any> {
    return AccessModel.create({ ...contract, deleted: false });
};

const updateAccess = async function (contract: AccessDTO): Promise<any> {
    return AccessModel.findByIdAndUpdate(contract.id, contract);
};

const deleteAccess = async function (id: string): Promise<any> {
    return AccessModel.findByIdAndUpdate(id, { deleted: true });
};

const findById = async function (id: string): Promise<any> {
    return AccessModel.findById(id).where({ deleted: false });
};

const deleteByIds = async function (ids: string[]): Promise<any> {
    const promises = ids.map((item) => deleteAccess(item));
    return Promise.all(promises);
};

const findIfNotInIds = async function (ids: string[]): Promise<any> {
    return AccessModel.where({ _id: { $nin: ids }, deleted: false });
};

const checkIfExistAccessName = async function (
    name: string,
    id?: string
): Promise<any> {
    if (!id) {
        return AccessModel.findOne().where({ deleted: false, name: name });
    }
    return AccessModel.findOne().where({
        deleted: false,
        name: name,
        _id: { $ne: id }
    });
};

const isSystem = function (id: string): Promise<any> {
    return AccessModel.findOne().where({ _id: id, isSystem: true });
};

export {
    getAllAccess,
    addAccess,
    updateAccess,
    deleteAccess,
    findById,
    deleteByIds,
    findIfNotInIds,
    checkIfExistAccessName,
    isSystem
};
