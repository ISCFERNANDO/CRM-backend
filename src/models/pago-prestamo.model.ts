import mongoose from '../utils/db_connection';

const pagoPrestamoModel = new mongoose.Schema(
    {
        fechaPago: Date,
        monto: Number,
        pagado: Boolean,
        deleted: Boolean,
        active: Boolean
    },
    { collection: 'pagoPrestamo' }
);

export default mongoose.model('pagoPrestamo', pagoPrestamoModel);
