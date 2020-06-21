const express = require('express');
const router = express.Router();
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/chat');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
http.listen(3001, function () {
    console.log('chat on :3001');
});
module.exports = router;
