import mongoose from '../utils/db_connection';

const pagoPrestamoModel = new mongoose.Schema(
    {
        prestamo: {
            type: mongoose.Types.ObjectId,
            ref: 'prestamo'
        },
        fechaPago: String,
        monto: Number,
        pagado: Boolean,
        deleted: Boolean,
        active: Boolean
    },
    { collection: 'pagoPrestamo' }
);

export default mongoose.model('pagoPrestamo', pagoPrestamoModel);
