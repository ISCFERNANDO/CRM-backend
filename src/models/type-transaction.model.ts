import mongoose from './../utils/db_connection';

const typeTransactionModel = new mongoose.Schema(
    {
        key: String,
        name: String,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean
    },
    { collection: 'typeTransaction' }
);

export default mongoose.model('typeTransaction', typeTransactionModel);
