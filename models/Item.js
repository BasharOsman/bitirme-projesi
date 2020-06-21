const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }

});

ItemSchema.pre('validate',
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

module.exports = Item = mongoose.model('item', ItemSchema);