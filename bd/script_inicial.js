const accesos = [
    {
        _id: ObjectId(),
        name: 'Accesos',
        route: '/accesos',
        description: 'Módulo para la administración de accesos',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Roles',
        route: '/roles',
        description: 'Módulo para la administración de roles',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Usuarios',
        route: '/usuarios',
        description: 'Módulo para la administración de usuarios',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Clientes',
        route: '/clientes',
        description: 'Módulo para la administración de clientes',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Préstamos',
        route: '/prestamos',
        description: 'Módulo para la administración de préstamos',
        active: true,
        deleted: false,
        isSystem: true
    }
];
accesos.forEach((item) =>
    db.access.update({ name: item.name }, item, { upsert: true })
);

const rolls = [
    {
        _id: ObjectId(),
        name: 'Administrador',
        description: 'Rol con todos los accesos y privilegios del sistema',
        active: true,
        deleted: false,
        isSystem: true,
        accesess: accesos.map((item) => item._id)
    }
];
rolls.forEach((item) =>
    db.rol.update({ name: item.name }, item, { upsert: true })
);

const users = [
    {
        _id: ObjectId(),
        name: 'Super',
        firstSurname: 'Admin',
        secondSurname: '',
        email: 'superadmin@gmail.com',
        deleted: false,
        isSystem: true,
        customRol: false,
        rol: { _id: rolls.find((item) => item.name === 'Administrador')._id },
        password: '1234567890',
        active: true
    }
];
users.forEach((item) =>
    db.user.update({ email: item.email }, item, { upsert: true })
);

/**Initialize catalogs */
const currency = [
    {
        _id: ObjectId(),
        name: 'MXN',
        description: 'Pesos mexicanos',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'USD',
        description: 'Dólares',
        active: true,
        deleted: false,
        isSystem: true
    }
];
currency.forEach((item) =>
    db.currency.update({ name: item.name }, item, { upsert: true })
);

const plazos = [];
for (let index = 1; index <= 11; index++) {
    plazos.push({
        _id: ObjectId(),
        name: `${index} me${index > 1 ? 'ses' : 's'}`,
        value: index,
        active: true,
        deleted: false,
        isSystem: true
    });
}
plazos.push({
    _id: ObjectId(),
    name: '1 año',
    value: 12,
    active: true,
    deleted: false,
    isSystem: true
});
plazos.push({
    _id: ObjectId(),
    name: '1 año y medio',
    value: 18,
    active: true,
    deleted: false,
    isSystem: true
});
plazos.push({
    _id: ObjectId(),
    name: '2 años',
    value: 24,
    active: true,
    deleted: false,
    isSystem: true
});
plazos.forEach((item) =>
    db.plazo.update({ name: item.name }, item, { upsert: true })
);

const paymentMethods = [
    {
        _id: ObjectId(),
        name: 'Diario',
        value: 1,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Semanal',
        value: 2,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Quincenal',
        value: 3,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Mensual',
        value: 4,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Una sola exhibición',
        value: 5,
        active: true,
        deleted: false,
        isSystem: true
    }
];
paymentMethods.forEach((item) =>
    db.paymentMethod.update({ name: item.name }, item, { upsert: true })
);

const paymentMethodInterest = [
    {
        _id: ObjectId(),
        paymentMethod: paymentMethods.find((item) => item.name === 'Diario')
            ._id,
        name: 'Porcentaje de interés y moratorio para pago diaro',
        monthlyInterest: 20,
        moratorioInterest: 5,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        paymentMethod: paymentMethods.find((item) => item.name === 'Semanal')
            ._id,
        name: 'Porcentaje de interés y moratorio para pago semanal',
        monthlyInterest: 20,
        moratorioInterest: 5,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        paymentMethod: paymentMethods.find((item) => item.name === 'Quincenal')
            ._id,
        name: 'Porcentaje de interés y moratorio para pago quincenal',
        monthlyInterest: 20,
        moratorioInterest: 5,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        paymentMethod: paymentMethods.find((item) => item.name === 'Mensual')
            ._id,
        name: 'Porcentaje de interés y moratorio para pago mensual',
        monthlyInterest: 20,
        moratorioInterest: 5,
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        paymentMethod: paymentMethods.find(
            (item) => item.name === 'Una sola exhibición'
        )._id,
        name:
            'Porcentaje de interés y moratorio para pago de una sola exhibición',
        monthlyInterest: 20,
        moratorioInterest: 5,
        active: true,
        deleted: false,
        isSystem: true
    }
];
paymentMethodInterest.forEach((item) =>
    db.paymentMethodInterest.update({ name: item.name }, item, { upsert: true })
);

db.statusPrestamo.insertMany([
    {
        _id: ObjectId('61834301ecd9add757420b58'),
        key: 'PENDIENTE_CONFIRMACION',
        name: 'Pendiente por confirmar',
        description: 'Solicitud en espera por confirmación del cliente',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId('61834301ecd9add757420b59'),
        key: 'CONFIRMADA',
        name: 'Confirmada',
        description: 'Solicitud confirmado por el cliente',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId('61834301ecd9add757420b5a'),
        key: 'CANCELADA',
        name: 'Cancelada',
        description: 'Solicitud cancelado por el cliente',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId('61834301ecd9add757420b5b'),
        key: 'RECHAZADA',
        name: 'Rechazada',
        description: 'Solicitud rechazada por la entidad financiera',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId('61834301ecd9add757420b5c'),
        key: 'LIQUIDADO',
        name: 'Liquidado',
        description: 'Crédito liquidado',
        active: true,
        deleted: false,
        isSystem: true
    }
]);

db.typeTransaction.insertMany([
    {
        _id: ObjectId('6184ba6d1447be014c130134'),
        key: 'INGRESO_FONDO',
        name: 'Ingreso de fondo',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId('6184ba6d1447be014c130135'),
        key: 'RETIRO_POR_PRESTAMO',
        name: 'Retiro por prestamo',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId('6184ba6d1447be014c130136'),
        key: 'INGRESO_POR_PAGO_DE_PRESTAMO',
        name: 'Ingreso por pago o abono de prestamo',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId('6184ba6d1447be014c130137'),
        key: 'RETIRO_POR_USUARIO',
        name: 'Retiro por usuario (disposición de efectivo)',
        active: true,
        deleted: false,
        isSystem: true
    }
]);
