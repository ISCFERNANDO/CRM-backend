import 'reflect-metadata';
import { Service } from 'typedi';
import { PlazoDTO } from '../dto/plazo.dto';
import { PlazoModel } from '../models';

export interface IPlazoRepository {
    getAllPlazos(): Promise<Array<PlazoDTO>>;
}

@Service()
export class PlazoRepository implements IPlazoRepository {
    public getAllPlazos = (): Promise<PlazoDTO[]> =>
        PlazoModel.where({ deleted: false });
}
