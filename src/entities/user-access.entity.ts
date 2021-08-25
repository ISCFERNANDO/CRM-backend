import { Column, Entity, ManyToOne } from 'typeorm';
import { Access } from './access.entity';
import { Rol } from './rol.entity';
import { User } from './user.model';

@Entity()
export class UserToAccess {
    @Column({ name: 'id_user' })
    userId: number;

    @Column({ name: 'id_access' })
    accessId: number;

    @Column()
    active: boolean;

    @ManyToOne(() => User, (user) => user.userToAccess)
    public user!: Rol;

    @ManyToOne(() => Access, (access) => access.userToAccess)
    public access!: Access;
}
