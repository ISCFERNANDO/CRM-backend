import mongoose from './../utils/db_connection';

const cajaModel = new mongoose.Schema(
    {
        name: String,
        balance: Number,
        transactions: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'transactionCaja'
            }
        ],
        active: Boolean,
        deleted: Boolean
    },
    { collection: 'caja' }
);

export default mongoose.model('caja', cajaModel);
