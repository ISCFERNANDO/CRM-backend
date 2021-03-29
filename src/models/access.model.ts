import mongoose from './../utils/db_connection';

const accessModel = new mongoose.Schema(
    {
        name: { type: String },
        route: { type: String },
        description: { type: String },
        active: { type: Boolean },
        deleted: { type: Boolean }
    },
    { collection: 'access' }
);

export default mongoose.model('access', accessModel);
