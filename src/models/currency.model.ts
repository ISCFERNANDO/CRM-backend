import mongoose from './../utils/db_connection';

const currencyModel = new mongoose.Schema(
    {
        name: String,
        description: String,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean
    },
    { collection: 'currency' }
);

export default mongoose.model('currency', currencyModel);
