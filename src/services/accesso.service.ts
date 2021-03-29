import { AccessDTO } from 'src/dto/access.dto';
import * as accessRepository from '../repositories/accesso.repository';

const getAllAccess = async function (): Promise<AccessDTO[]> {
    const access = await accessRepository.getAllAccess();
    return access.map(mapAccess);
};

const addAccess = async function (contract: AccessDTO): Promise<AccessDTO> {
    const data = await accessRepository.addAccess(contract);
    contract.id = data._id;
    return contract;
};

const updateAccess = async function (contract: AccessDTO): Promise<AccessDTO> {
    const data = await accessRepository.updateAccess(contract);
    if (!data) {
        //TODO: lanzar exception
        throw new Error('No se actualizó la información');
    }
    contract.id = data._id;
    return contract;
};

const deleteAccess = async function (id: string): Promise<boolean> {
    const data = await accessRepository.deleteAccess(id);
    console.log(data);
    return true;
};

const findAccessById = async function (id: string): Promise<AccessDTO> {
    const data = await accessRepository.findById(id);
    return mapAccess(data);
};

function mapAccess(item: any): AccessDTO {
    return {
        id: item._id,
        name: item.name,
        route: item.route,
        description: item.description,
        active: item.active
    };
}

export { getAllAccess, addAccess, updateAccess, deleteAccess, findAccessById };
