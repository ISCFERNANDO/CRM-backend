import * as mongoose from 'mongoose';

console.log('antes de conectar ');

mongoose.set('useFindAndModify', false);
mongoose.set('debug', process.env.DEBUG);
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('despues de conectar');
export default mongoose;
