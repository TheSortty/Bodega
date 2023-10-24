//CONEXION AL SERVER REFERENCIA

const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//VERIFICAR SI LA CONEXION FUE CORRECTA O NOnom
connection.connect((err) => {
    if (!err) {
        console.log("Conneceted")

    } else {
        console.error("Don't connected 404", err)
        return;
    }

});

module.exports = connection;