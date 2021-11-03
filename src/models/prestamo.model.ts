import mongoose from '../utils/db_connection';

const prestamoModel = new mongoose.Schema(
    {
        autorizadorCredito: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        contratanteCredito: {
            type: mongoose.Types.ObjectId,
            ref: 'customer'
        },
        datosCredito: {
            fechaExpedicion: String,
            moneda: {
                type: mongoose.Types.ObjectId,
                ref: 'currency'
            },
            montoPrestamo: Number,
            formaPago: {
                type: mongoose.Types.ObjectId,
                ref: 'paymentMethod'
            },
            plazoCredito: {
                type: mongoose.Types.ObjectId,
                ref: 'plazo'
            },
            porcentajeInteresMensual: Number,
            porcentajeInteresMoratorio: Number,
            totalPagar: Number,
            fechaVencimiento: String,
            liquidated: Boolean
        },
        direccionContratacion: {
            codigoPostal: String,
            pais: String,
            estado: String,
            colonia: String,
            calle: String,
            numeroExterior: String,
            numeroInterior: String
        },
        deleted: Boolean,
        active: Boolean
    },
    { collection: 'prestamo' }
);

export default mongoose.model('prestamo', prestamoModel);
