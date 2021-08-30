import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolToAccess } from './rol-access.entity';

@Entity()
export class Rol {
    @PrimaryColumn()
    id!: number;

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

    @OneToMany(() => RolToAccess, (rollToAccess) => rollToAccess.roll)
    public rollToAccess!: RolToAccess[];
}
