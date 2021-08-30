import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Access } from './access.entity';
import { Rol } from './rol.entity';
import { User } from './user.model';

@Entity()
export class UserToAccess {
    @PrimaryColumn({ name: 'id_user' })
    userId: number;

    @PrimaryColumn({ name: 'id_access' })
    accessId: number;

    @Column()
    active: boolean;

    @ManyToOne(() => User, (user) => user.id)
    public user!: Rol;

    @ManyToOne(() => Access, (access) => access.id)
    public access!: Access;
}
