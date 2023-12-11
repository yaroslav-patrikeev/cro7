import nodemailer from 'nodemailer';

const transoprter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'christina.corwin@ethereal.email',
    pass: '9fSUuZGahX573FruFA',
  },
});

function sendLunchEmail(message) {
  transoprter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    return console.log('Email sent: ', info);
  });
}

export { sendLunchEmail };
