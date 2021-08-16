import mongoose from '../utils/db_connection';

const customerModel = new mongoose.Schema(
    {
        tipoPersona: String,
        razonSocial: String,
        nombreEmpresa: String,
        sitioWeb: String,
        photoUrl: String,
        telefonos: [
            {
                tipoTelefono: String,
                telefono: String,
                extension: String
            }
        ],
        representante: {
            name: String,
            firstSurname: String,
            secondSurname: String,
            email: String
        },
        direccion: {
            codigoPostal: String,
            pais: String,
            estado: String,
            colonia: String,
            calle: String,
            numeroExterior: String,
            numeroInterior: String
        },
        deleted: Boolean,
        active: Boolean
    },
    { collection: 'customer' }
);

export default mongoose.model('customer', customerModel);
