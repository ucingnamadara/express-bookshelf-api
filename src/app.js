var express = require('express');
const bodyParser = require('body-parser');
const bookRoute = require('./route/book.route')

//create var app from express
var app = express();

var port = 9000;

app.use(bodyParser.json());
app.use(bookRoute)
app.listen(port, () => console.log('listening to ' + port));

module.exports = app;