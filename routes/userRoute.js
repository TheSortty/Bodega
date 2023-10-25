const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const dotenv = require('dotenv');

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');


dotenv.config();

// Uso para registrarse en la página
router.post('/signup', (req, res) => {
    let user = req.body;
    let query = "select email, password, role, status from users where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into users(name, contact, email, password, status, role) values(?,?,?,?, 'false', 'user')";
                connection.query(query, [user.name, user.contact, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully registered!" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(400).json({ message: "Email already exists." });
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

// Para iniciar sesión en la página
router.post('/login', (req, res) => {
    const user = req.body;
    let query = "select email, password, role, status from users where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password !== user.password) {
                return res.status(401).json({ message: "Incorrect username or password" });
            } else if (results[0].status === "false") {
                return res.status(401).json({ message: "Wait for admin approval" });
            } else {
                const response = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
                    expiresIn: "8h",
                });
                return res.status(200).json({ token: accessToken });
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

// Correo para recuperación de contraseña
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// Para la recuperación de contraseña
router.post('/recoverpassword', (req, res) => {
    const user = req.body;
    let query = "select email, password from users where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(404).json({ message: "Email not found" });
            } else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'WINE BLOCK - ACCESS RECOVERY',
                    html: '<p><b>Tus credenciales del sistema son los siguientes:</b> <br>  <b>EMAIL:</b> ' + results[0].email + ' <br> <b>CLAVE:</b> ' + results[0].password + ' <br> <a href="http://localhost:4200">Click para acceder al sistema</a></p>'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Email sent successfuly" + info.response);
                    }
                });
                return res.status(200).json({ message: "Password sent successfully to your email." });
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

//Para ver todos los usuarios disponibles
router.get('/get', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let query = "select id, name, email, contact, status from users where role='user'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

//PARA VERIFICAR LA CUENTA
router.patch('/update', auth.authenticateToken, checkRole.checkRole,(req, res) => {
    let user = req.body;
    let query = "update users set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User ID does not exist." })
            }
            return res.status(200).json({ message: "User update successfully!" })
        } else {
            return res.status(500).json(err);
        }
    })
})

//Checkear un token
router.get('/checkToken', auth.authenticateToken, (req, res) => {
    return res.status(200).json({ message: "True" })
})


module.exports = router;
