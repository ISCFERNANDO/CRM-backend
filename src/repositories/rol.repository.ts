import { Service } from 'typedi';
import { RolModel } from '../models';
import { RolDTO } from './../dto/rol.dto';

export interface IRollRepository {
    getAllRol(): Promise<Array<any>>;
    addRol(contract: RolDTO): Promise<any>;
    updateRol(contract: RolDTO): Promise<any>;
    deleteRol(id: string): Promise<any>;
    findById(id: string): Promise<any>;
    deleteByIds(ids: string[]): Promise<any>;
    partialUpdateRol(contract: RolDTO): Promise<any>;
    checkIfExistAccessName(name: string, id?: string): Promise<any>;
    isSystem(id: string): Promise<any>;
}

@Service()
export class RollRepository implements IRollRepository {
    public getAllRol = (): Promise<any[]> => RolModel.where({ deleted: false });

    public addRol = (contract: RolDTO): Promise<any> =>
        RolModel.create(this.rollDtoToModel(contract));

    public updateRol = (contract: RolDTO): Promise<any> =>
        RolModel.findByIdAndUpdate(contract.id, this.rollDtoToModel(contract));

    public deleteRol = (id: string): Promise<any> =>
        RolModel.findByIdAndUpdate(id, { deleted: true });

    public findById = (id: string): Promise<any> =>
        RolModel.findById(id).where({ deleted: false }).populate('accesess');

    public deleteByIds(ids: string[]): Promise<any> {
        const promises = ids.map((item) => this.deleteRol(item));
        return Promise.all(promises);
    }
    public partialUpdateRol = (contract: RolDTO): Promise<any> =>
        RolModel.findByIdAndUpdate(contract.id, { ...contract });

    checkIfExistAccessName(name: string, id?: string): Promise<any> {
        if (!id) {
            return RolModel.findOne().where({ deleted: false, name: name });
        }
        return RolModel.findOne().where({
            deleted: false,
            name: name,
            _id: { $ne: id }
        });
    }
    public isSystem = (id: string): Promise<any> =>
        RolModel.findOne().where({ _id: id, isSystem: true });

    private rollDtoToModel(contract: RolDTO): any {
        return {
            name: contract.name,
            description: contract.description,
            active: contract.active,
            isSystem: contract.isSystem,
            accesess: contract.accesess.map((item) => ({
                _id: item.id
            })),
            deleted: false
        };
    }
}
