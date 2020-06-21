const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CommentSchema = new Schema({
    userid: {
        type: String,
    },
    postid: {
        type: String,

    },
    author: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = PostComment = mongoose.model('PostComments', CommentSchema);