import mongoose from './../utils/db_connection';

const transactionCajaModel = new mongoose.Schema(
    {
        typeTransaction: {
            type: mongoose.Types.ObjectId,
            ref: 'typeTransaction'
        },
        userTransaction: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        description: String,
        transactionAmount: Number,
        confirmed: Boolean,
        active: Boolean,
        deleted: Boolean
    },
    { collection: 'transactionCaja' }
);

export default mongoose.model('transactionCaja', transactionCajaModel);
