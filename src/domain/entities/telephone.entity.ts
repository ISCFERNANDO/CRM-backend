import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CustomerToTelephone } from './customer-telephone.entity';

@Entity()
export class Telephone {
    @PrimaryColumn()
    id: number;

    @Column({ name: 'id_phone_type' })
    phoneTypeId: string;

    @Column()
    phoneNumber: string;

    @Column()
    extension: string;

    @Column()
    active: boolean;

    @Column()
    deleted: boolean;

    @OneToMany(
        () => CustomerToTelephone,
        (customerToTelephone) => customerToTelephone.phone
    )
    public customerToTelephone!: CustomerToTelephone[];
}
