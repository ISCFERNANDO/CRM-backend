import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Configuration {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    value: string;

    @Column()
    active: boolean;

    @Column()
    deleted: boolean;

    @Column({ name: 'is_system' })
    isSystem: boolean;
}