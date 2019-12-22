const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');

mongoose.connect(config.MONGO_URL, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

let db = mongoose.connection;

let TaskSchema = mongoose.Schema({
    summary: {
        type: String,
        index: true
    },
    description: {
        type: String
    },
    assignee: {
        type: String
    },
    type: {
        type: Number
    },
    priority: {
        type: Number
    }
});


let Task = module.exports = mongoose.model('Task', TaskSchema);
