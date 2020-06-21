const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //Simple valdiation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'all fields required' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User email aleady exists' });
            const newUser = new User({
                name,
                email,
                password
            });
            // Create salt& hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token: token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        });
    User.findOne({ name })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User name aleady exists' });
            const newUser = new User({
                name,
                email,
                password
            });
        })
});

router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});

router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

router.get('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user).then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;