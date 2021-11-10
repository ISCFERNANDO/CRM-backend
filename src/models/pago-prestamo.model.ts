import mongoose from '../utils/db_connection';

const pagoPrestamoModel = new mongoose.Schema(
    {
        fechaPago: Date,
        monto: Number,
        montoInteres: Number,
        montoPagado: Number,
        pagado: Boolean,
        pagoCompleto: Boolean,
        pagoInteres: Boolean,
        deleted: Boolean,
        active: Boolean
    },
    { collection: 'pagoPrestamo' }
);

export default mongoose.model('pagoPrestamo', pagoPrestamoModel);
