const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

//Creat Schema
const MessageSchema = new Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    isnew: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
MessageSchema.pre('validate',
    function (next) {
        if (this.title) {
            this.slug = slugify(this.title,
                {
                    lower: true,
                    strict: true
                })
        }

        next();
    })
module.exports = Message = mongoose.model('Message', MessageSchema);