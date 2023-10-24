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