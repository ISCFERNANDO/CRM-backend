import mongoose from './../utils/db_connection';

const accessModel = new mongoose.Schema(
    {
        name: String,
        route: String,
        description: String,
        active: Boolean,
        deleted: Boolean
    },
    { collection: 'access' }
);

export default mongoose.model('access', accessModel);
