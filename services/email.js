'use strict';
const nodemailer = require('nodemailer');
const EMAILCONFIG = require('../config/email_cfg')

const transporter =  nodemailer.createTransport({ // config mail server
  host: EMAILCONFIG.default_host,
  port: EMAILCONFIG.default_port,
  auth: {
      user: EMAILCONFIG.default_username,
      pass: EMAILCONFIG.default_password
  },
  tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
  }
});

module.exports = {
  sending: (fullLogs) => {
    let mailOptions = {
      from: EMAILCONFIG.default_sender, // sender address
      to: EMAILCONFIG.default_receiver, // list of receivers
      subject: 'VNPT Drive Log Alert', // Subject line
      html: 
          '<h2 style="color: red;"> \
          Dear VNPT Drive Admin, we found some error logs on your server. \
          Please help to check!!! \
          </h2> \
          <h3>Full Logs</h3> \
          <ul> \
            <li>' + fullLogs.join('<li>') + '\
          </ul>'
    };
    transporter.sendMail(mailOptions, function(err, info){
      if (err) {
          console.log(err);
      } else {
          console.log('Message sent: ' +  info.response);
      }
    });
  }
}



