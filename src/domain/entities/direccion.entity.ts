import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Direccion {
    @PrimaryColumn()
    id: number;

    @Column()
    codigoPostal: string;

    @Column()
    pais: string;

    @Column()
    estado: string;

    @Column()
    colonia: string;

    @Column()
    calle: string;

    @Column()
    numeroExterior: string;

    @Column()
    numeroInterior: string;
}
