const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');

mongoose.connect(config.MONGO_URL, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

let db = mongoose.connection;

let TaskSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});
