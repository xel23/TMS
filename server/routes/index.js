const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get('/', function (req, res) {
    res.send('home');
});

router.get('/login', function (req, res) {
    res.render('login', {title: 'Login'});
});

router.post('/login',
    passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid username or password'}),
    function(req, res) {
        req.flash('success', 'You are now logged in');
        res.redirect('/dashboard')
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user){
            return done(null, false, {message: 'Unknown user'});
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) return done(err);
            if (isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid password'})
            }
        })
    });
}));

router.get('/register', function (req, res) {
    res.render('register', {title: 'Register', errors: null});
});

router.post('/register', function (req, res) {
    const {name, email, username, password, password_2} = req.body;

    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password_2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {title: 'Register', errors: errors})
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });
        req.flash('success', 'You are now registered and you can log in');
        res.redirect('/login');
    }
});

router.get('/profile', ensureAuthenticated, function (req, res) {
    res.send('profile')
});

router.get('/task-list', ensureAuthenticated, function (req, res) {
    res.render('list', {title: 'List'});
});

router.get('/dashboard', ensureAuthenticated, function (req, res) {
    res.render('dashboard', {title: 'Dashboard'});
});

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/login');
});

router.get('/createTask', ensureAuthenticated, (req, res) => {
    Task.find({}).then(tasks => {
        res.render('createTask', {title: 'Create Task', tasks: tasks})
    });
});

router.post('/createTask', ensureAuthenticated, (req, res) => {
    const {summary, description, username, type, priority} = req.body;

    req.checkBody('summary', 'Summary filed is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('createTask', {title: 'Create Task', errors: errors})
    } else {
        Task.create({
            summary: summary,
            description: description || 'No description',
            username: username.name || 'Unassigneed',
            type: type || 'Untype',
            priority: priority || 'Normal'
        }).then(task => {
            res.redirect('/list');
        })
    }
});

module.exports = router;
