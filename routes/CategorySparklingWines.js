const express = require('express');
const connection = require('../connection');
const router = express.Router();

const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

//Agregar un tipo de espumante
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let Category = req.body;
    let query = "INSERT INTO CategorySparklingWines (Tipo) VALUES (?)";
    connection.query(query, [Category.Tipo], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Category added successfully" });
        } else {
            return res.status(500).json(err);
        }
    })
})


//Obtener todos los tipos de espumantes
router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "SELECT * FROM CategorySparklingWines";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })

})


//Hacer cambios en un tipo de espumante YA existente
router.patch('/update', auth.authenticateToken, (req, res, next) => {
    let product = req.body;
    var query = "UPDATE CategorySparklingWines SET Tipo=? WHERE id=?";
    connection.query(query, [product.Tipo, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Category not found." })
            }
            return res.status(200).json({ message: "Category update successfully!" });
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;