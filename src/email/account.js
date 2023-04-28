const nodemailer = require('nodemailer');

let config = {
    service : 'gmail',
    auth : {
        user : process.env.NODEMAILER_USER,
        pass : process.env.NODEMAILER_PASS
    }
}

let transporter = nodemailer.createTransport(config)

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: 'harsh239001@gmail.com',  
        to: email, 
        subject: "Thanks for joining in!", 
        text: `Welcome to the app, ${name}. Let me konw how you get along with the app.`, 
    })
}

const sendCancelationEmail = (email, name) => {
    transporter.sendMail({
        from: 'harsh239001@gmail.com',  
        to: email, 
        subject: "Sorry to see you go!", 
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`, 
    })
}
module.exports= {
    sendWelcomeEmail,
    sendCancelationEmail
}

/*
transporter.sendMail({
    from: 'harsh239001@gmail.com',  
    to: "harshpatel23900@gmail.com", 
    subject: "email testing by harsh patel", 
    text: "i sending email from nodejs with using nodemailer..", 
    html: "<html><body><h3>Hello Daxit..</h3><p>I Am Harsh Patel..</p><pre>i sending email from nodejs with using nodemailer..</pre></body></html>", // html body
  }).then(console.log)
  .catch(console.log)
  */