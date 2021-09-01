import { EntityTarget, getRepository, InsertResult, Repository } from 'typeorm';

export interface ICrudRepository<T, ID> {
    save(t: T): Promise<ID>;
    findOne(id: ID): Promise<T | undefined>;
    exists(id: ID): Promise<boolean>;
    findAll(id?: Array<ID>): Promise<Array<T>>;
    count(): Promise<number>;
    delete(t: Array<ID>): Promise<void>;
}

export class CrudRepository<T, ID> implements ICrudRepository<T, ID> {
    private repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = getRepository<T>(entity);
    }

    save = async (t: T): Promise<ID> => {
        const result: InsertResult = await this.repository.insert(t);
        return result.raw.insertId;
    };

    findOne = (id: ID): Promise<T | undefined> => this.repository.findOne(id);

    exists = async (id: ID): Promise<boolean> =>
        (await this.repository.findOne(id)) !== undefined;

    findAll(ids?: Array<ID>): Promise<T[]> {
        if (ids) {
            return this.repository
                .createQueryBuilder()
                .where('deleted = false')
                .andWhereInIds(ids)
                .getMany();
        }
        return this.repository
            .createQueryBuilder()
            .where('deleted = false')
            .getMany();
    }

    count = (): Promise<number> => this.repository.count();

    async delete(ids: Array<ID>): Promise<void> {
        const promises: Array<Promise<T>> = [];
        for (const id of ids) {
            const data: any = await this.repository.findOne(id);
            data.deleted = true;
            promises.push(this.repository.save(data));
        }
        Promise.all(promises);
    }
}
