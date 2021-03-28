const route = require('express').Router();

route
    .route('/accesos')
    .get((req: any, res: any) => {
        res.send({ message: 'Lista accesos' });
    })
    .post((req: any, res: any) => {
        res.send({ message: 'Alta acceso' });
    })
    .put((req: any, res: any) => {
        res.send({ message: 'Modificacion acceso' });
    })
    .delete((req: any, res: any) => {
        res.send({ message: 'Eliminacion acceso' });
    });

module.exports = route;
