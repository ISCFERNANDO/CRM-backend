require('dotenv/config');
import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as timeout from 'connect-timeout';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { join } from 'path';
import 'reflect-metadata';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import routes from './routes';

const app = express();
createPublicDirectory();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(
    morgan(
        ':method :url :remote-addr - :remote-user [:date[clf]] :status :res[content-length] - :response-time ms'
    )
);
app.use(timeout('10s'));
app.use(haltOnTimedout);
//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(join(__dirname, 'public/images')));

//rutas
app.use('/crm-api', routes);

//middlewares
app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`App listening on PORT ${port}`));

function haltOnTimedout(req: any, res: any, next: any) {
    if (!req.timedout) next();
}

function createPublicDirectory() {
    const pathDirectory = join(__dirname, 'public');
    if (!fs.existsSync(pathDirectory)) {
        fs.mkdirSync(pathDirectory, { recursive: true });
    }
}
