import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_HOST ? parseInt(process.env.DB_HOST) : 3306,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '../entities'],
    synchronize: true,
    logging: false
});
