import mongoose from '../utils/db_connection';

const paymentMethodModel = new mongoose.Schema(
    {
        name: String,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean
    },
    { collection: 'paymentMethod' }
);

export default mongoose.model('paymentMethod', paymentMethodModel);
