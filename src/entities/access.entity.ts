import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolToAccess } from './rol-access.entity';
import { UserToAccess } from './user-access.entity';

@Entity()
export class Access {
    @PrimaryColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    route: string;

    @Column()
    description?: string;

    @Column()
    active: boolean;

    @Column()
    deleted: boolean;

    @Column({ name: 'is_system' })
    isSystem: boolean;

    @OneToMany(() => RolToAccess, (rollToAccess) => rollToAccess.access)
    public rollToAccess!: RolToAccess[];

    @OneToMany(() => UserToAccess, (userToAccess) => userToAccess.access)
    public userToAccess!: UserToAccess[];
}
