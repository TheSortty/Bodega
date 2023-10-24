const express = require('express');
const connection = require('../connection')
const router = express.Router();

//Uso para registrarse a la pagina
router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select email, password, role, status from users where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into users(name, contact, email, password, status, role) value(?,?,?,?, 'false', 'user')";
                connection.query(query, [user.name, user.contact, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "!Successfully registered!" });
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(400).json({ message: "Emaily already exist." });
            }
        } else {
            return res.status(500).json(err);
        }
    })
});



module.exports = router;