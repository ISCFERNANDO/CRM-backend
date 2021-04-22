import * as mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);
mongoose.set('debug', process.env.DEBUG);
const connectionUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose
    .connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connection established to mongodb');
    })
    .catch(() => {
        console.log('connection fallida to mongodb');
    });

export default mongoose;
