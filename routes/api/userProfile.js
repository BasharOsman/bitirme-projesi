const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');

const UserProfile = require('../../models/UserProfile');

router.get('/', (req, res) => {
    UserProfile.find()
        .sort({ date: -1 })
        .then(Profile => res.json(Profile))
});

router.get('/:name', (req, res) => {
    UserProfile.find({ username: req.params.name })
        .then(Profile => res.json(Profile))
        .catch(err => res.status(404).json({ success: false }))
});

router.post('/', (req, res) => {

    const newUserProfile = new UserProfile({
        username: req.body.username,
        userid: req.body.userid,
        user: req.body.user,
        img: req.body.img,
        skills: req.body.skills,
        education: req.body.education,
        email: req.body.email,
    });

    newUserProfile.save().then(UserProfile => res.json(UserProfile));
});

router.put('/:id', (req, res) => {
    UserProfile.findById(req.params.id, (err, obj) => {
        if (err) { console.log("error is:" + err + "obj is :" + obj) }
        else {
            if (req.body) {
                obj.user = req.body.user;
                obj.img = req.body.img;
                obj.skills = req.body.skills;
                obj.education = req.body.education;
            }

            obj.save();
        }
    })
        .then(UserProfile => { res.json(UserProfile) })
        .catch(err => res.status(404).json({ success: false }));
});


router.delete('/:id', auth, (req, res) => {
    UserProfile.findById(req.params.id)
        .then(UserProfile => UserProfile.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;