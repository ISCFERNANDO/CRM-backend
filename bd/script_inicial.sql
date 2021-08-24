CREATE DATABASE IF NOT EXISTS db_crm;

USE db_crm;

CREATE TABLE access(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    route VARCHAR(40) NOT NULL,
    description VARCHAR(150),
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    is_system BOOL NOT NULL
);

INSERT INTO
    access(id, name, route, description, is_system)
VALUES
    (
        1,
        'Usuarios',
        '/usuarios',
        'Módulo para la administración de usuarios',
        true
    ),
    (
        2,
        'Roles',
        '/roles',
        'Módulo para la administración de roles',
        true
    ),
    (
        3,
        'Accesos',
        '/accesos',
        'Módulo para la administración de accesos',
        true
    ),
    (
        4,
        'Clientes',
        '/clientes',
        'Módulo para la administración de clientes',
        true
    ),
    (
        5,
        'Préstamos',
        '/prestamos',
        'Módulo para la administración de préstamos',
        true
    );

CREATE TABLE configuration(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(150),
    value VARCHAR(20),
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    is_system BOOL NOT NULL
);

INSERT INTO
    configuration (id, name, description, value, is_system)
VALUES
    (
        1,
        'Interés mensual',
        'Tasa de interés mensual',
        '20',
        true
    ),
    (
        2,
        'Interés anual',
        'Tasa de interés anual',
        '30',
        true
    );

CREATE TABLE type_person(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1) NOT NULL,
    description VARCHAR(20),
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    is_system BOOL NOT NULL
);

INSERT INTO
    type_person (id, name, description, is_system)
VALUES
    (1, 'F', 'Física', true),
    (2, 'M', 'Moral', true);

CREATE TABLE type_currency(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(5) NOT NULL,
    description VARCHAR(20),
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    is_system BOOL NOT NULL
);

INSERT INTO
    type_currency(id, name, description, is_system)
VALUES
    (1, 'MXN', 'Nacional', true),
    (2, 'USD', 'Dólares', true);

CREATE TABLE phone_type(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    is_system BOOL NOT NULL
);

INSERT INTO
    phone_type(id, name, is_system)
VALUES
    (1, 'Oficina', true),
    (2, 'Celular', true),
    (3, 'Casa', true);

CREATE TABLE telephone(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_phone_type SMALLINT NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    extension VARCHAR(6),
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_telephone_phone_type FOREIGN KEY(id_phone_type) REFERENCES phone_type (id)
);

CREATE TABLE persona(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    first_surname VARCHAR(40) NOT NULL,
    second_surname VARCHAR(40),
    email VARCHAR(60)
);

CREATE TABLE direccion(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    codigo_postal VARCHAR(5) NOT NULL,
    pais VARCHAR(30) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    colonia VARCHAR(50) NOT NULL,
    calle VARCHAR(80) NOT NULL,
    numero_exterior VARCHAR(10) NOT NULL,
    numero_interior VARCHAR(10)
);

CREATE TABLE customer(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_type_person SMALLINT NOT NULL,
    razon_social VARCHAR(30),
    nombre_empresa VARCHAR(60),
    sitio_web VARCHAR(100),
    photo_url VARCHAR(100),
    id_representante BIGINT NOT NULL,
    id_direccion INT NOT NULL,
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_customer_type_persona FOREIGN KEY (id_type_person) REFERENCES type_person(id),
    CONSTRAINT fk_customer_representante FOREIGN KEY (id_representante) REFERENCES persona(id)
);

CREATE TABLE customer_telephone(
    id_phone BIGINT NOT NULL,
    id_customer BIGINT NOT NULL,
    CONSTRAINT pk_customer_telephone PRIMARY KEY(id_phone, id_customer),
    CONSTRAINT fk_customer_telephone_telephone FOREIGN KEY (id_phone) REFERENCES telephone(id),
    CONSTRAINT fk_customer_telephone_customer FOREIGN KEY (id_customer) REFERENCES customer(id)
);

CREATE TABLE rol(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    is_system BOOL NOT NULL
);

CREATE TABLE rol_access(
    id_rol INT NOT NULL,
    id_access INT NOT NULL,
    active BOOL NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_rol_access PRIMARY KEY (id_rol, id_access),
    CONSTRAINT fk_rol_access_rol FOREIGN KEY(id_rol) REFERENCES rol(id),
    CONSTRAINT fk_rol_access_access FOREIGN KEY(id_access) REFERENCES access(id)
);

CREATE TABLE user(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_persona BIGINT NOT NULL,
    phone_number VARCHAR(10),
    age SMALLINT,
    password VARCHAR(100) NOT NULL,
    image_url VARCHAR(100),
    id_rol INT,
    active BOOL NOT NULL DEFAULT TRUE,
    deleted BOOL NOT NULL DEFAULT FALSE,
    is_system BOOL NOT NULL,
    CONSTRAINT fk_usuario_persona FOREIGN KEY(id_persona) REFERENCES persona(id),
    CONSTRAINT fk_usuario_rol FOREIGN KEY(id_rol) REFERENCES rol(id)
);

CREATE TABLE user_access(
    id_user BIGINT NOT NULL,
    id_access INT NOT NULL,
    active BOOL NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_user_access PRIMARY KEY(id_user, id_access),
    CONSTRAINT fk_user_access_user FOREIGN KEY(id_user) REFERENCES user(id),
    CONSTRAINT fk_user_access_access FOREIGN KEY(id_access) REFERENCES access(id)
);