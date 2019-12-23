const path = require('path');
const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const db = mongoose.connection;

const routes = require('./routes/index');

let app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../client/views'));
app.use(express.static(path.join(__dirname, '../client/public')));

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

app.post('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
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
