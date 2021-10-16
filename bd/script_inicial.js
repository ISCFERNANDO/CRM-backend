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
        _id: '1',
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
        active: true,
        deleted: false,
        isSystem: true
    });
}
plazos.push({
    _id: ObjectId(),
    name: '1 año',
    active: true,
    deleted: false,
    isSystem: true
});
plazos.push({
    _id: ObjectId(),
    name: '1 año y medio',
    active: true,
    deleted: false,
    isSystem: true
});
plazos.push({
    _id: ObjectId(),
    name: '2 años',
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
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Semanal',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Quincenal',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Mensual',
        active: true,
        deleted: false,
        isSystem: true
    },
    {
        _id: ObjectId(),
        name: 'Una sola exhibición',
        active: true,
        deleted: false,
        isSystem: true
    }
];
paymentMethods.forEach((item) =>
    db.paymentMethod.update({ name: item.name }, item, { upsert: true })
);
