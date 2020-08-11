const nodemailer = require('nodemailer')


const sendEmail = async (data,email = 'bazqbex@gmail.com') => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const html = `<div>
                    <h1>Your ${data.status} confirence</h1>
                    <div>Date: ${data.dateOfArival}</div>
                    <div>Country: ${data.country}</div>
                </div>`
    const promise = new Promise((resolve,reject) => {

        const result =  transporter.sendMail({
            from: '"Node js" <nodejs@example.com>',
            to: email,
            subject: "Message from Node js",
            text: "This message was sent from Node js server.",
            html: html
        });

        resolve(result)
    })

    return promise
}

module.exports = sendEmail



