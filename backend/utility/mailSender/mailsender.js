const nodemailer = require("nodemailer");

require("dotenv").config();

exports.mailSender = async (email,title,body) =>{
        try{
        //   step -- 1 create transporter -->
            let transport =  nodemailer.createTransport({
                   host:process.env.MAIL_HOST,
                   auth:{
                      user:process.env.MAIL_USER,
                      pass:process.env.MAIL_PASS
                   }
                   
            });

            // step -2 send the mail
            const info = await transport.sendMail({
                from:`"learnShot" <${process.env.MAIL_USER}> `,
                to:`${email}`,
                subject:`${title}`,
                html:`${body}`
            })

            return info 

        }catch(err){
           console.error(err);
           return err.message
        }
}