const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/userRoute')
const CategorySparklingWines = require('./routes/CategorySparklingWines')
const CategoryWines = require('./routes/CategoryWines')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/userRoute', userRoute);
app.use('/CategorySparklingWines', CategorySparklingWines);
app.use('/CategoryWines', CategoryWines);


module.exports = app;