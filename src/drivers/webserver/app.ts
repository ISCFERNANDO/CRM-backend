import { json, urlencoded } from 'body-parser';
import * as timeout from 'connect-timeout';
import * as express from 'express';
import * as fs from 'fs';
import { Server } from 'http';
import { join } from 'path';
import { errorHandler } from '../../middlewares/error.middleware';
import { notFoundHandler } from '../../middlewares/not-found.middleware';
import routes from './routes';
import compression = require('compression');
import cors = require('cors');
import morgan = require('morgan');

export class App {
    private _app: express.Express = express();
    private _port: number;

    constructor() {
        this.createPublicDirectory();
        this._app.use(json());
        this._app.use(urlencoded({ extended: true }));
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
            express.static(join(__dirname, 'public/images'))
        );
        this._app.use('/crm-api', routes);
        this._app.use(errorHandler);
        this._app.use(notFoundHandler);
        this._port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
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

    get port() {
        return this._port;
    }

    public listen(callback: any): Server {
        return this._app.listen(this.port, callback);
    }
}
