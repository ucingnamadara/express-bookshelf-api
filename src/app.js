const express = require('express');
const bodyParser = require('body-parser');
const bookRoute = require('./route/book.route');

// create var app from express
const app = express();

const port = 9000;

app.use(bodyParser.json());
app.use(bookRoute);
app.listen(port);

module.exports = app;
