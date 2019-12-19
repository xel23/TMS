const path = require('path');
var express = require('express');
var parser = require('body-parser');
var cookieParser = require('cookie-parser');
const config = require('./config');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var routes = require('./routes/index');

var app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../client/views'));
app.use(express.static(path.join(__dirname, '../client/public')));

// let data = [1, 2, 3, 5, 6, 11];
//
// app.get('/', function (req, res) {
//     res.render('index', {data: data});
// });

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

app.use('/', routes);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
