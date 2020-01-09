const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MONGO_URL, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

let db = mongoose.connection;

let CommentSchema = mongoose.Schema({
    id_task: {
        type: String,
        index: true
    },
    comment: {
        type: String,
    },
    date: {
        type: String
    },
    leftComment: {
        type: String
    }
});

let Comment = module.exports = mongoose.model('Comment', CommentSchema);
