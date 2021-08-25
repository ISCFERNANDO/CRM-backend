import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TypeCurrency {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    active: boolean;

    @Column()
    deleted: boolean;

    @Column({ name: 'is_system' })
    isSystem: boolean;
}
