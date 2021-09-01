import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Access } from './access.entity';
import { Rol } from './rol.entity';

@Entity({ name: 'rol_access' })
export class RolToAccess {
    @PrimaryColumn({ name: 'id_rol' })
    rolId: number;

    @PrimaryColumn({ name: 'id_access' })
    accessId: number;

    @Column()
    active: boolean;

    @ManyToOne(() => Rol, (rol) => rol.id)
    @JoinColumn({ name: 'rolId' })
    public roll!: Rol;

    @ManyToOne(() => Access, (access) => access.id)
    @JoinColumn({ name: 'accessId' })
    public access!: Access;
}
