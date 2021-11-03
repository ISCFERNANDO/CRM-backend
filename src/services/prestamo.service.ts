import { Service } from 'typedi';
import { PrestamoItemDTO } from './../dto/prestamo-item.dto';
import { PrestamoDTO } from './../dto/prestamo.dto';
import { PrestamoRepository } from './../repositories/prestamo.repository';

export interface IPrestamoService {
    addPrestamo(contract: PrestamoDTO): Promise<PrestamoDTO | void>;
    findAllPrestamos(): Promise<Array<PrestamoItemDTO>>;
}

@Service()
export class PrestamoService implements IPrestamoService {
    constructor(private prestamoRepository: PrestamoRepository) {}

    async addPrestamo(contract: PrestamoDTO): Promise<void | PrestamoDTO> {
        const data = await this.prestamoRepository.addPrestamo(contract);
        contract.id = data._id;
        return contract;
    }

    async findAllPrestamos(): Promise<Array<PrestamoItemDTO>> {
        const prestamos = await this.prestamoRepository.findAllPrestamos();
        return prestamos.map(this.mapPrestamo);
    }

    private mapPrestamo(prestamo: any): PrestamoItemDTO {
        console.log(prestamo);
        return {
            id: prestamo._id,
            autorizadorCreditoId: prestamo.autorizadorCredito,
            contratanteCredito: {
                id: prestamo.contratanteCredito._id,
                name: prestamo.contratanteCredito.representante.name,
                firstSurname:
                    prestamo.contratanteCredito.representante.firstSurname,
                secondSurname:
                    prestamo.contratanteCredito.representante.secondSurname,
                email: prestamo.contratanteCredito.representante.email,
                telefono: prestamo.contratanteCredito.telefonos[0].telefono
            },
            datosCredito: {
                totalPagar: prestamo.datosCredito.totalPagar,
                fechaExpedicion: prestamo.datosCredito.fechaExpedicion,
                fechaVencimiento: prestamo.datosCredito.fechaVencimiento,
                moneda: prestamo.datosCredito.moneda.name,
                liquidated: prestamo.datosCredito.liquidated
            },
            active: prestamo.active
        };

        //id, nombre y apellidos del contratante, telefono, adeudo, fecha vencimiento, liquidado
    }
}
