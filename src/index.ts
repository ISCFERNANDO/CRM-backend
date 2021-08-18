require('dotenv/config');
import { App } from './drivers/webserver/app';

const app = new App();
app.listen(() => console.log('Server is listen in ', app.port));
