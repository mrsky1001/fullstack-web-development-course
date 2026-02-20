
const express = require('express');
const productRouter = require('./routers/product.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRouter)

module.exports = app;