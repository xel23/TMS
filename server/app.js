const path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../client/views'));

let data = [1, 2, 3, 5, 6, 11];

app.get('/', function (req, res) {
    res.render('index', {data: data});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});