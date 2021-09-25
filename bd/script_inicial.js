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
