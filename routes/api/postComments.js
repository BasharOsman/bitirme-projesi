const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const PostComment = require('../../models/PostComments');

router.get('/', (req, res) => {
    PostComment.find()
        .sort({ date: -1 })
        .then(comments => res.json(comments))
});


router.get('/:id', (req, res) => {
    PostComment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ success: false }))
});

router.post('/', auth, (req, res) => {
    const newPostComment = new PostComment({
        body: req.body.body,
        author: req.body.author,
        postid: req.body.postid,
        userid: req.body.userid,
    });

    newPostComment.save().then(comment => res.json(comment));
});

router.put('/:id', auth, (req, res) => {
    PostComment.findById(req.params.id, (err, obj) => {
        if (err) { console.log("error is:" + err + "obj is :" + obj) }
        else {
            if (req.body) {
                obj.post = req.body.post;
                obj.author = req.body.author;
            }
            obj.save();
        }
    })
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ success: false }));
});


router.delete('/:id', auth, (req, res) => {
    PostComment.findById(req.params.id)
        .then(comment => comment.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;