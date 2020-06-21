const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Message = require('../../models/messages');

router.get('/', (req, res) => {
    Message.find()
        .sort({ date: -1 })
        .then(Messages => res.json(Messages))
});


router.get('/:slug', (req, res) => {
    Message.find({ slug: req.params.slug })
        .then(Message => res.json(Message))
        .catch(err => res.status(404).json({ success: false, test: false }))
});

router.post('/', auth, (req, res) => {
    const newMessage = new Message({
        from: req.body.from,
        to: req.body.to,
        title: req.body.title,
        body: req.body.body,
    });

    newMessage.save().then(Message => res.json(Message));
});

router.put('/:id', auth, (req, res) => {
    Message.findById(req.params.id, (err, obj) => {
        if (err) { console.log("error is:" + err + "obj is :" + obj) }
        else {
            if (req.body) {
                obj.from = req.body.from;
                obj.to = req.body.to;
                obj.title = req.body.title;
                obj.body = req.body.body;
                obj.isnew = req.body.isnew;
            }

            obj.save();
        }
    })
        .then(Message => { res.json(Message) })
        .catch(err => res.status(404).json({ success: false }));
});

router.delete('/:id', auth, (req, res) => {
    Message.findById(req.params.id)
        .then(Message => Message.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;