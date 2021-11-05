import 'reflect-metadata';
import { Service } from 'typedi';
import { CajaModel } from '../models';
import { CajaDTO } from './../dto/caja.dto';

export interface ICajaRepository {
    addCaja(caja: CajaDTO): Promise<any>;
    findCajaByName(name: string): Promise<any>;
}

@Service()
export class CajaRepository implements ICajaRepository {
    public addCaja = (caja: CajaDTO): Promise<any> =>
        CajaModel.create({ ...caja, deleted: false });

    public findCajaByName = (name: string): Promise<any> =>
        CajaModel.findOne({ name });
}
