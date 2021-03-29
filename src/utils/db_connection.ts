import * as mongoose from 'mongoose';

console.log('antes de conectar ');

mongoose.set('useFindAndModify', false);
mongoose.set('debug', process.env.DEBUG);
const connectionUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('despues de conectar');
export default mongoose;
