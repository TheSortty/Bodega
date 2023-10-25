const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const user = require('./routes/user')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', user);


module.exports = app;