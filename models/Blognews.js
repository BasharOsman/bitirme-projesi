const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

//Create Schema
const BlognewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    news: {
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
    },


}).index({ index: true, expires: 60 });

BlognewsSchema.pre('validate',
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

module.exports = Blognews = mongoose.model('blognews', BlognewsSchema);