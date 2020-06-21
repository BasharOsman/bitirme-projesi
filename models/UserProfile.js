const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

//Creat Schema
const UserProfileSchema = new Schema({
    username: {
        type: String,
    },
    userid: {
        type: String,
    },
    user: {
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    img: {
        profile: {
            type: String,
        },
        avatar: {
            type: String,
        }
    },
    skills: {
        type: String
    },
    education: {
        university: String,
        startDate: Date,
        endDate: Date,
        degree: String,
        field: String,
        description: String
    },
    email: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserProfile = mongoose.model('UserProfile', UserProfileSchema);