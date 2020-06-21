const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Blognews = require('../../models/Blognews');


router.get('/', (req, res) => {
    Blognews.find()
        .sort({ date: -1 })
        .then(blognews => res.json(blognews))
});

router.get('/:slug', (req, res) => {
    Blognews.find({ slug: req.params.slug })
        .then(blognews => res.json(blognews))
        .catch(err => res.status(404).json({ success: false, data: req.params.slug }))
});

router.post('/', auth, (req, res) => {
    const newblognews = new Blognews({
        title: req.body.title,
        news: req.body.news,
        img: req.body.img
    });

    newblognews.save().then(blognews => res.json(blognews));
});

router.put('/:id', auth, (req, res) => {
    Blognews.findById(req.params.id, (err, obj) => {
        if (err) { console.log("error is:" + err + "obj is :" + obj) }
        else {
            if (req.body) {
                obj.title = req.body.title;
                obj.news = req.body.news;
                obj.img = req.body.img
            }
            obj.save();
        }
    })
        .then(blognews => res.json(blognews))
        .catch(err => res.status(404).json({ success: false }));
});


router.delete('/:id', auth, (req, res) => {
    Blognews.findById(req.params.id)
        .then(blognews => blognews.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;