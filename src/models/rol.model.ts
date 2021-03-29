//import * as mongoose from 'mongoose';
import mongoose from './../utils/db_connection';

const rolModel = new mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        active: { type: Boolean }
    },
    { collection: 'rol' }
);

export default mongoose.model('rol', rolModel);
