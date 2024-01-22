const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = process.env.PORT || 5000;
const {EMAIL, PASSWORD} = require('./env.js')

app.use('', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'jhoabran@gmail.com',
        pass: 'gkil yowc idsz mcdz',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.post('/email-code-verification', async (req, res) => {
    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    console.log(EMAIL)
    const {to } = req.body;
    const subject = 'Codigo de Verificacion [Caracas-ToGo]'
    const code = Math.floor(1000 + Math.random() * 9000);
    const mailData = {
        from: 'jhoabran@gmail.com',
        to: to,
        subject: subject,

        text: `text`,
    };

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    res.status(200).send({ message: "Mail send", message_id: info.messageId, code: code });
});


route.post('/message', (req, res) => {
    res.status(200).send({ message: "Finolin 3"});
});