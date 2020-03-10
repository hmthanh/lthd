const nodemailer = require("nodemailer")

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    auth: {
        user: 'project.1',
        pass: 'secret.1'
    }
})

module.exports = {
    sentMail: (toEmail, subject, msg, htmlmsg) => {
        // send mail with defined transport object
        console.log(toEmail)
        transporter.sendMail({
            from: '"New Vimo" <vimo@vm.com.vn>', // sender address
            to: toEmail, // list of receivers
            subject: subject, // Subject line
            text: msg, // plain text body
            html: htmlmsg // html body
        }, (err, info) => {
            // console.log("Message sent: %s", err)
            console.log("Message sent: %s", info)
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        })
    }
}