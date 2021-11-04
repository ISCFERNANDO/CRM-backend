import mongoose from '../utils/db_connection';

const statusPrestamoModel = new mongoose.Schema(
    {
        key: String,
        name: String,
        description: String,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean
    },
    { collection: 'statusPrestamo' }
);

export default mongoose.model('statusPrestamo', statusPrestamoModel);
