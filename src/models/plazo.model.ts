import mongoose from '../utils/db_connection';

const plazoModel = new mongoose.Schema(
    {
        name: String,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean
    },
    { collection: 'plazo' }
);

export default mongoose.model('plazo', plazoModel);
