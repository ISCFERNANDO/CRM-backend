import mongoose from './../utils/db_connection';

const rolModel = new mongoose.Schema(
    {
        name: String,
        description: String,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean,
        accesess: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'access'
            }
        ]
    },
    { collection: 'rol' }
);

export default mongoose.model('rol', rolModel);
