const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async(options)=>{
   
    const transporter = nodeMailer.createTransport({
       
        
        service:process.env.SMPT_SERVICE,
        port: 465,
        secure: true,
        auth:{
            user:process.env.SMPT_EMAIL,
            pass:process.env.SMPT_PASSWORD,
        }
    })
    console.log("working",transporter)
    const mailoptions={
        from:process.env.SMPT_SERVICE,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailoptions)

}

module.exports = sendEmail;