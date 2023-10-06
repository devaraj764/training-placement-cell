const nodemailer = require('nodemailer');
require('dotenv/config');


const user = 'mdevaraju764@gmail.com';
const pass = process.env.MAIL_PASSWORD;

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'mdevaraju764@gmail.com',
        // pass: 'ifueftmfazhobqoo'
        user: user,
        pass: pass
    }
});

const sendMail = async ({ emails, subject, body }) => {
    let details = {
        from: user,
        to: emails,
        subject: subject,
        html: body
    }

    try {
        await mailTransporter.sendMail(details);
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

module.exports = sendMail;