import 'reflect-metadata';
import { Service } from 'typedi';
import { StatusPrestamoModel } from '../models';

export interface IStatusPrestamoRepository {
    findByKey(key: string): Promise<any>;
}

@Service()
export class StatusPrestamoRepository implements IStatusPrestamoRepository {
    public findByKey(key: string): Promise<any> {
        return StatusPrestamoModel.findOne({ key, deleted: false });
    }
}
