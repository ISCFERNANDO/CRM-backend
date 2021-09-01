import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Rol } from './rol.entity';
import { Telephone } from './telephone.entity';

@Entity({ name: 'customer_telephone' })
export class CustomerToTelephone {
    @PrimaryColumn({ name: 'id_phone' })
    phoneId: number;

    @PrimaryColumn({ name: 'id_customer' })
    customerId: number;

    @ManyToOne(() => Telephone, (telephone) => telephone.id)
    public phone!: Rol;

    @ManyToOne(() => Customer, (customer) => customer.id)
    public customer!: Customer;
}
