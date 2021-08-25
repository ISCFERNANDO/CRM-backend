import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Persona {
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
}
