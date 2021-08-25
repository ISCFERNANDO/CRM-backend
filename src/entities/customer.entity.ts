import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from 'typeorm';
import { CustomerToTelephone } from './customer-telephone.entity';
import { Direccion } from './direccion.entity';
import { Persona } from './persona.entity';
import { TypePerson } from './type-person.entity';

@Entity()
export class Customer {
    @PrimaryColumn()
    id: number;

    @Column({ name: 'id_type_person' })
    tipoPersonaId: string;

    @Column()
    razonSocial: string;

    @Column()
    nombreEmpresa: string;

    @Column()
    sitioWeb: string;

    @Column()
    photoUrl: string;

    @Column()
    deleted: boolean;

    @Column()
    active: boolean;

    @Column({ name: 'id_representante' })
    representanteId: number;

    @Column({ name: 'id_direccion' })
    direccionId: number;

    @OneToOne(() => TypePerson)
    @JoinColumn()
    tipoPersona!: TypePerson;

    @OneToOne(() => Persona)
    @JoinColumn()
    representante!: Persona;

    @OneToOne(() => Direccion)
    @JoinColumn()
    direccion!: Persona;

    @OneToMany(
        () => CustomerToTelephone,
        (customerToTelephone) => customerToTelephone.customer
    )
    public customerToTelephone!: CustomerToTelephone[];
}
