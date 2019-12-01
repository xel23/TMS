const path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../client/views'));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});