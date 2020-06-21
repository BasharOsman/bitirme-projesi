const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
const config = require('config');

const email = config.get("email");
const password = config.get("emailpass");
const emailreceive = config.get("emailreceive");

const transport = {
    service: 'gmail',
    auth: {
        user: email, // TODO: your gmail account
        pass: password // TODO: your gmail password
    }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `;

    var mail = {
        from: name,
        to: emailreceive,  // Change to email address that you want to receive messages on
        subject: 'New Message from Simple Blog Contact Form',
        html: output
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
})

const app = express()
app.use(cors())




module.exports = router;