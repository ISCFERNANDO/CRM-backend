import { Column, Entity, ManyToOne } from 'typeorm';
import { Access } from './access.entity';
import { Rol } from './rol.entity';

@Entity({ name: 'rol_access' })
export class RolToAccess {
    @Column({ name: 'id_rol' })
    rolId: number;

    @Column({ name: 'id_access' })
    accessId: number;

    @Column()
    active: boolean;

    @ManyToOne(() => Rol, (rol) => rol.rollToAccess)
    public roll!: Rol;

    @ManyToOne(() => Access, (access) => access.rollToAccess)
    public access!: Access;
}
