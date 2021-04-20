import mongoose from './../utils/db_connection';

const userModel = new mongoose.Schema(
    {
        name: String,
        firstSurname: String,
        secondSurname: String,
        email: String,
        phoneNumber: String,
        age: Number,
        photoUrl: String,
        deleted: Boolean,
        isSystem: Boolean,
        customRol: Boolean,
        rol: {
            type: mongoose.Types.ObjectId,
            ref: 'rol'
        },
        accesess: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'access'
            }
        ],
        active: Boolean
    },
    { collection: 'user' }
);

export default mongoose.model('user', userModel);
