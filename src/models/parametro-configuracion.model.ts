import mongoose from '../utils/db_connection';

const parametroConfiguracionModel = new mongoose.Schema(
    {
        key: String,
        name: String,
        description: String,
        value: String,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean
    },
    { collection: 'parametroConfiguracion' }
);

export default mongoose.model(
    'parametroConfiguracion',
    parametroConfiguracionModel
);
