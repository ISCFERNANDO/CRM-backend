import * as timeout from 'connect-timeout';
import * as express from 'express';
import * as fs from 'fs';
import { Server } from 'http';
import { join } from 'path';
import { errorHandler } from '../../middlewares/error.middleware';
import { notFoundHandler } from '../../middlewares/not-found.middleware';
import { createMysqlConnection } from '../../utils/db_connection';
import { initializeRoutes } from './routes';
import compression = require('compression');
import cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

export class App {
    private _app: express.Express = express();
    private _port: number;

    get port() {
        return this._port;
    }

    public async listen(callback: any): Promise<Server> {
        try {
            const conn = await createMysqlConnection();
            console.log('connected ==> ', conn.isConnected);
            this.createPublicDirectory();
            this._app.use(bodyParser.json());
            this._app.use(bodyParser.urlencoded({ extended: true }));
            this._app.use(cors());
            this._app.use(compression());
            this._app.use(
                morgan(
                    ':method :url :remote-addr - :remote-user [:date[clf]] :status :res[content-length] - :response-time ms'
                )
            );
            this._app.use(timeout('10s'));
            this._app.use(this.haltOnTimedout);
            this._app.use(
                '/images',
                express.static(join(__dirname, '../..', 'public/images'))
            );

            this._app.use('/crm-api', initializeRoutes());
            this._app.use(errorHandler);
            this._app.use(notFoundHandler);
            this._port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
            return this._app.listen(this.port, callback);
        } catch (error) {
            console.log('custom error ==> ', error);
            throw error;
        }
    }

    private createPublicDirectory() {
        const pathDirectory = join(__dirname, 'public');
        if (!fs.existsSync(pathDirectory)) {
            fs.mkdirSync(pathDirectory, { recursive: true });
        }
    }

    private haltOnTimedout(req: any, res: any, next: any) {
        if (!req.timedout) next();
    }
}
