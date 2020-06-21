const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const router = express.Router();

const nodemailer = require('nodemailer');
const cors = require("cors");

const app = express();
app.use(cors())
app.use('/', router);

//Bodyparser Middlewart
app.use(express.json());

//DB config
const db = config.get("mongoURI");

//connect to mongo 
mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err));

app.get('/uploads/userProfiles/:name', function (req, res) {
    res.sendFile(__dirname + '/uploads/userProfiles/' + req.params.name);
});
app.get('/uploads/news/:name', function (req, res) {
    res.sendFile(__dirname + '/uploads/news/' + req.params.name);
});

app.use('/api/items', require('./routes/api/items'));
app.use('/api/post/Comment', require('./routes/api/postComments'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/usermessage', require('./routes/api/messages'));
app.use('/api/user/profile', require('./routes/api/userProfile'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/newsupload', require('./routes/api/newsUpload'));
app.use('/api/news', require('./routes/api/blognews'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/send', require('./routes/nodemail'));
app.use('/chat', require('./routes/Chats'));

//Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port} .....`));
