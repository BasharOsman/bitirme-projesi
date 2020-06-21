const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');
const Comments = require('../../models/PostComments');

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

router.get('/:slug', (req, res) => {
    Item.find({ slug: req.params.slug })
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false, data: req.params.slug }))
});

router.get('/:slug/comments', (req, res) => {
    Item.find({ slug: req.params.slug })
        .then(item => {
            Comments.find({ postid: item[0]._id })
                .then(comments => {
                    return res.json(comments)
                })

        })
        .catch(err => res.status(404).json({ success: false, data: req.params.slug }))
});


router.post('/', auth, (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        post: req.body.post,
        author: req.body.author
    });

    newItem.save().then(item => res.json(item));
});

router.put('/:id', auth, (req, res) => {
    Item.findById(req.params.id, (err, obj) => {
        if (err) { console.log("error is:" + err + "obj is :" + obj) }
        else {
            if (req.body) {
                obj.title = req.body.title;
                obj.post = req.body.post;
                obj.author = req.body.author;
                obj.date = new Date();
            }
            obj.save();
        }
    })
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
});

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;