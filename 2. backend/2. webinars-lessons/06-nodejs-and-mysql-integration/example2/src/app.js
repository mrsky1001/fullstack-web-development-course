const express = require('express');
const app = express();
const productRouter = require('./routers/product.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/product', productRouter);

// localhost:3000/about
app.get('/produtc/all', (req, res) => {
    res.send(`<h1>About Page</h1>`)
})

app.get('/', (req, res) => {
    res.send(`<h1>Main Page</h1>`)
})

module.exports = app;