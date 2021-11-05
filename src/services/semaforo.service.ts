import 'reflect-metadata';
import { Service } from 'typedi';
import { SemaforoDTO } from './../dto/semaforo.dto';

export interface ISemaforoService {
    calculateColorSemaforo(numDias: number): SemaforoDTO | null;
}

@Service()
export class SemaforoService implements ISemaforoService {
    private semaforos: SemaforoDTO[] = [
        {
            color: 'verde',
            style: 'green',
            valor_inicial: 10
        },
        {
            color: 'naranja',
            style: 'orange',
            valor_inicial: 0,
            valor_final: 9
        },
        {
            color: 'rojo',
            style: 'red',
            valor_inicial: -1
        }
    ];
    constructor() {}

    public calculateColorSemaforo(numDias: number): SemaforoDTO | null {
        if (numDias < 0) {
            return this.semaforos[2];
        }
        return (
            this.semaforos.find(
                (item) =>
                    numDias >= item.valor_inicial &&
                    (!item.valor_final || numDias <= item.valor_final)
            ) ?? null
        );
    }
}
