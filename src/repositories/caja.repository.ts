import 'reflect-metadata';
import { Service } from 'typedi';
import { CajaModel } from '../models';
import { CajaDTO } from './../dto/caja.dto';

export interface ICajaRepository {
    addCaja(caja: CajaDTO): Promise<any>;
    findAll(): Promise<Array<any>>;
    updateCaja(id: string, caja: Object): Promise<any>;
    findCajaByName(name: string): Promise<any>;
    findCajaById(id: string): Promise<any>;
}

@Service()
export class CajaRepository implements ICajaRepository {
    public addCaja = (caja: CajaDTO): Promise<any> =>
        CajaModel.create({ ...caja, deleted: false });

    public findAll = (): Promise<Array<any>> =>
        CajaModel.where({ deleted: false });

    public updateCaja = (id: string, caja: Object): Promise<any> =>
        CajaModel.findByIdAndUpdate(id, { ...caja });

    public findCajaByName = (name: string): Promise<any> =>
        CajaModel.findOne({ name });

    public findCajaById = (id: string): Promise<any> => {
        return CajaModel.findById(id).populate({
            path: 'transactions',
            populate: { path: 'typeTransaction' }
        });
    };
}
