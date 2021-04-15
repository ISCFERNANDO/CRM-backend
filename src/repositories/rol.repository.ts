import { RolModel } from '../models';
import { RolDTO } from './../dto/rol.dto';

const getAllRol = async function (): Promise<Array<any>> {
    return RolModel.where({ deleted: false });
};

const addRol = async function (contract: RolDTO): Promise<any> {
    return RolModel.create(rollDtoToModel(contract));
};

const updateRol = async function (contract: RolDTO): Promise<any> {
    return RolModel.findByIdAndUpdate(contract.id, rollDtoToModel(contract));
};

function rollDtoToModel(contract: RolDTO): any {
    return {
        name: contract.name,
        description: contract.description,
        active: contract.active,
        isSystem: true,
        accesess: contract.accesess.map((item) => ({
            _id: item.id
        })),
        deleted: false
    };
}

const deleteRol = async function (id: string): Promise<any> {
    return RolModel.findByIdAndUpdate(id, { deleted: true });
};

const findById = async function (id: string): Promise<any> {
    return RolModel.findById(id).where({ deleted: false }).populate('accesess');
};

const deleteByIds = async function (ids: string[]): Promise<any> {
    const promises = ids.map((item) => deleteRol(item));
    return Promise.all(promises);
};

export { getAllRol, addRol, updateRol, deleteRol, findById, deleteByIds };
