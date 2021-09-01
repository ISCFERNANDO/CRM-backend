import { join } from 'path';
import 'reflect-metadata';
import { getConnectionManager } from 'typeorm';

const connectionManager = getConnectionManager();

const createMysqlConnection = () => {
    return connectionManager
        .create({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [join(__dirname, '..', '/domain/entities/**.*s')],
            synchronize: false,
            logging: true
        })
        .connect();
};

export { createMysqlConnection };
