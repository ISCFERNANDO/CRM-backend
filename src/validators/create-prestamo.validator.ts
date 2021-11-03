import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HttpException from '../common/http.exception';
import { Messages } from './../constants/messages';

const createPrestamoValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rules = [
        body('contratanteCreditoId')
            .exists()
            .withMessage('El contratante es requerido')
            .isLength({ min: 10 })
            .withMessage('El contratante debe tener mínimo 10 caracteres')
            .run(req),
        body('datosCredito')
            .exists()
            .withMessage('Los datos del crédito son requeridos')
            .run(req),
        body('datosCredito.fechaVencimiento')
            .exists()
            .withMessage('La fecha de vencimiento de crédito es requerido')
            .matches(
                /(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})$/i
            )
            .withMessage(
                'La fecha de vencimiento debe cumplir el siguiente formato DD/MM/YYYY'
            )
            .run(req),
        body('datosCredito.fechaExpedicion')
            .exists()
            .withMessage('La fecha de expedición de crédito es requerido')
            .matches(
                /(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})$/i
            )
            .withMessage(
                'La fecha de expedición debe cumplir el siguiente formato DD/MM/YYYY'
            )
            .run(req),
        body('datosCredito.moneda')
            .exists()
            .withMessage('La moneda es requerido')
            .run(req),
        body('datosCredito.montoPrestamo')
            .exists()
            .withMessage('El monto de préstamo es requerido')
            .matches(/[0-9]+(.[0-9]+)?$/i)
            .withMessage('El monto del préstamo es inválido')
            .run(req),
        body('datosCredito.formaPago')
            .isLength({ min: 10 })
            .withMessage('La forma de pago es requerido')
            .run(req),
        body('datosCredito.plazoCredito')
            .isLength({ min: 10 })
            .withMessage('El plazo del crédito es requerido')
            .run(req),
        body('datosCredito.porcentajeInteresMensual')
            .exists()
            .withMessage('El porcentaje de interés mensual es requerido')
            .matches(/[0-9]+(.[0-9]+)?$/i)
            .withMessage('El porcentaje de interés mensual es inválido')
            .run(req),
        body('datosCredito.porcentajeInteresMoratorio')
            .exists()
            .withMessage('El porcentaje de interés moratorio es requerido')
            .matches(/[0-9]+(.[0-9]+)?$/i)
            .withMessage('El porcentaje de interés moratorio es inválido')
            .run(req),
        body('datosCredito.totalPagar')
            .exists()
            .withMessage('El total a pagar es requerido')
            .matches(/[0-9]+(.[0-9]+)?$/i)
            .withMessage('El total a pagar es inválido')
            .run(req),

        body('direccionContratacion.codigoPostal')
            .exists()
            .withMessage('El código postal es requerido')
            .isNumeric()
            .withMessage('El código postal debe ser numérico')
            .isLength({ min: 5, max: 5 })
            .withMessage('El código postal debe tener 5 caracteres')
            .run(req),
        body('direccionContratacion.pais')
            .exists()
            .withMessage('El pais es requerido')
            .run(req),
        body('direccionContratacion.estado')
            .exists()
            .withMessage('El estado es requerido')
            .run(req),
        body('direccionContratacion.colonia')
            .exists()
            .withMessage('La colonia es requerido')
            .isLength({ min: 1, max: 60 })
            .withMessage('La colonia debe tener entre 1 y 60 caracteres')
            .matches(/^[a-z 0-9 ,.áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('El colonia solo debe contener letras y números')
            .run(req),
        body('direccionContratacion.calle')
            .exists()
            .withMessage('La calle es requerido')
            .isLength({ min: 1, max: 60 })
            .withMessage('La calle debe tener entre 1 y 60 caracteres')
            .matches(/^[a-z 0-9 ,.áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('El calle solo debe contener letras y números')
            .run(req),
        body('direccionContratacion.numeroExterior')
            .isLength({ min: 0, max: 8 })
            .withMessage('El número exterior debe tener entre 1 y 8 caracteres')
            .matches(/^([0-9]+|(S\/N)|(Lote [0-9]+))$/i)
            .withMessage(
                'El número exterior solo debe tener números, S/N ó Lote'
            )
            .run(req),
        body('direccionContratacion.numeroInterior')
            .isLength({ min: 0, max: 8 })
            .withMessage('El número interior debe tener entre 1 y 8 caracteres')
            .matches(/^$|^([0-9]+|(S\/N)|(Lote [0-9]+))$/i)
            .withMessage(
                'El número interior solo debe tener números, S/N ó Lote'
            )
            .run(req)
    ];

    await Promise.all(rules);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpException(400, Messages.BAD_REQUEST, errors.array()[0]));
        return;
    }
    next();
};

export default createPrestamoValidator;
