import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from 'typeorm';
import { Rol } from './rol.entity';
import { UserToAccess } from './user-access.entity';

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstSurname: string;

    @Column()
    secondSurname: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    age: number;

    @Column()
    imageUrl: string;

    @Column()
    customRol: boolean;

    @Column({ name: 'id_rol' })
    rolId: number;

    @Column()
    password: string;

    @Column()
    deleted: boolean;

    @Column({ name: 'is_system' })
    isSystem: boolean;

    @Column()
    active: boolean;

    @OneToOne(() => Rol)
    @JoinColumn()
    roll!: Rol;

    @OneToMany(() => UserToAccess, (userToAccess) => userToAccess.user)
    public userToAccess!: UserToAccess[];
}
