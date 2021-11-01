import mongoose from '../utils/db_connection';

const paymentMethodInterestModel = new mongoose.Schema(
    {
        paymentMethod: {
            type: mongoose.Types.ObjectId,
            ref: 'paymentMethod'
        },
        name: String,
        monthlyInterest: Number,
        moratorioInterest: Number,
        active: Boolean,
        deleted: Boolean,
        isSystem: Boolean
    },
    { collection: 'paymentMethodInterest' }
);

export default mongoose.model(
    'paymentMethodInterest',
    paymentMethodInterestModel
);
