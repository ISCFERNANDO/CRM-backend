import 'reflect-metadata';
import { Service } from 'typedi';
import { AccessModel } from '../models';
import { AccessDTO } from './../dto/access.dto';
export interface IAccessoRepository {
    getAllAccess(): Promise<Array<any>>;

    addAccess(contract: AccessDTO): Promise<any>;

    updateAccess(contract: AccessDTO): Promise<any>;

    deleteAccess(id: string): Promise<any>;

    findById(id: string): Promise<any>;

    deleteByIds(ids: string[]): Promise<any>;

    findIfNotInIds(ids: string[]): Promise<any>;

    findIfInIds(ids: string[]): Promise<any>;

    checkIfExistAccessName(name: string, id?: string): Promise<any>;

    isSystem(id: string): Promise<any>;
}

@Service()
export class AccessoRepository implements IAccessoRepository {
    public getAllAccess = (): Promise<Array<any>> =>
        AccessModel.where({ deleted: false });

    public addAccess = (contract: AccessDTO): Promise<any> =>
        AccessModel.create({ ...contract, deleted: false });

    public updateAccess = (contract: AccessDTO): Promise<any> =>
        AccessModel.findByIdAndUpdate(contract.id, contract);

    public deleteAccess = (id: string): Promise<any> =>
        AccessModel.findByIdAndUpdate(id, { deleted: true });

    public findById(id: string): Promise<any> {
        return AccessModel.findById(id).where({ deleted: false });
    }

    public deleteByIds(ids: string[]): Promise<any> {
        const promises = ids.map((item) => this.deleteAccess(item));
        return Promise.all(promises);
    }

    public findIfNotInIds = (ids: string[]): Promise<any> =>
        AccessModel.where({ _id: { $nin: ids }, deleted: false });

    public findIfInIds = (ids: string[]): Promise<any> =>
        AccessModel.where({ _id: { $in: ids }, deleted: false });

    public checkIfExistAccessName(name: string, id?: string): Promise<any> {
        if (!id) {
            return AccessModel.findOne().where({ deleted: false, name: name });
        }
        return AccessModel.findOne().where({
            deleted: false,
            name: name,
            _id: { $ne: id }
        });
    }

    public isSystem = (id: string): Promise<any> =>
        AccessModel.findOne().where({ _id: id, isSystem: true });
}
