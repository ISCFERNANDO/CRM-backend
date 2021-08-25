import { Column, Entity, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Rol } from './rol.entity';
import { Telephone } from './telephone.entity';

@Entity({ name: 'customer_telephone' })
export class CustomerToTelephone {
    @Column({ name: 'id_phone' })
    phoneId: number;

    @Column({ name: 'id_customer' })
    customerId: number;

    @ManyToOne(() => Telephone, (telephone) => telephone.customerToTelephone)
    public phone!: Rol;

    @ManyToOne(() => Customer, (customer) => customer.customerToTelephone)
    public customer!: Customer;
}
