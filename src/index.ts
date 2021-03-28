require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const timeout = require('connect-timeout');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());
app.use(
    morgan(
        ':method :url :remote-addr - :remote-user [:date[clf]] :status :res[content-length] - :response-time ms'
    )
);
app.use(timeout('10s'));
app.use(haltOnTimedout);

function haltOnTimedout(req: any, res: any, next: any) {
    if (!req.timedout) next();
}

app.get('/', (req: any, res: any) => {
    res.send({ message: 'Hello world with typescript' });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
