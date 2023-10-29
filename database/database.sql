create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contact varchar(20),
    email varchar(100),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
)

insert into users(name, contact, email, password, status, role)
value('TheSortty', '+5492612407277', 'gonzalo.murguia@outlook.es', 'Admin123', 'true', 'admin')

create table CategoryEspumante(
    idTipo_espumante int not null AUTO_INCREMENT,
    Tipo varchar(250) not null,
    primary key(id)
)

create table CategoryWines(
    idTipo_vino int not null AUTO_INCREMENT,
    Tipo varchar(250) not null,
    primary key(id)
)

create table product (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
)