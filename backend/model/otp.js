const mongoose = require("mongoose");

const mailSender = require("../utility/mailSender/mailsender");

const emailOtpTemplate = require("../utility/mailTemplate/emailVerificationTemp")

const otpSchema = new mongoose.Schema(
    {
        // email --->
        email:{
             type:String,
             required:true,
             trim:true
        },
        // otp -->
        otp:{
            type:String,
            required:true,
            trim:true
        },
        // otp doc is automatically delete after 5 min 
        createdAt:{
              type:Date,
              default:Date.now,
              expires:60*5
        }
    }
);


  async function sendEmailVarification(email,otp) {
       try{

        // mail sender  --->
        const emailResponse = await mailSender(
                email,
                "Verification Email",
                // email template with otp -->
                emailOtpTemplate(otp)

        )

       }catch(error){
             console.error("Error while sending the Email",error);
             throw error;
       }
  }

// before -- save send a email to the user with otp -->
otpSchema.pre("save",async function(next){
     
         
	// Only send an email when a new document is created
       if(this.isNew){
           await sendEmailVarification(this.email,this.otp);
       }
        next();

     

});

module.exports = mongoose.model("Otp",otpSchema);