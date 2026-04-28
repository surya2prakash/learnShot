
// two things to do -->1.genrate a token  for reset password and reset password 

const validator = require("validator");
const crypto = require("crypto");
const User = require("../../model/user");
const mailSender = require("../../utility/mailSender/mailsender");
const bcrypt = require("bcrypt");
const passwordUpdated = require("../../utility/mailTemplate/passwordUpdateTemp");


exports.resetPasswordToken = async(req,res) =>{
       try{
           const email = req.body.email ;

           if(!email){
             return res.status(400).json({
                 success:false,
                 message:"Email required."
             });
           };
          
           if(!validator.isEmail(email)){
               return res.status(400).json({
                 success:false,
                 message:"Enter vaild email."
               });
           };
          
         
        const token = await crypto.randomBytes(20).toString("hex");

        // update the token into the user doc --->
        const updateToken = await User.findOneAndUpdate({email:email.toLowerCase()},{token:token,resetPasswordExpire:Date.now() + 3*60*60*1000},{new:true})

        // now send a mail and link for reset password -->
        let url ;

           const response = await mailSender(
              email,
               "Password Reset",
                `Your Link for email verification is ${url}. Please click this url to reset your password.`
           )
       
           return res.status(200).json({
                success:true,
                message:"Email is successfully send. Please check your Email to continiue further"
           });


       }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"Facing issue while sending the reset-message."
          })
       }
};

exports.resetpassword = async(req,res) =>{
          try{
            //  in step -1 link is send to the mail box user click on that link -->
            // password,confirm-password and token from body --->
            
            const {password,confirmPassword,token} = req.body ;

            //check password and confirm password field 
            if(!password || !confirmPassword){
                  return res.status(400).json({
                     success:false,
                     message:"password and confirm-password fields required."
                  });
            };

            if(!token){
                  return res.status(400).json({
                      success:false,
                      message:"Token required."
                  });
            };

            const checkToken = await User.findOne({token:token}).select("+password");
            //   check expiration time if more then current time then --->
            if(!(checkToken.resetPasswordExpire > Date.now())){
                   return res.status(403).json({
                       success:false,
                       message:"Token is Expires,Genrate new token."
                   });
            };

            //  check password and confirm-password are same -->

            if(password !== confirmPassword){
                  return res.status(400).json({
                      success:false,
                      message:"Password not Match with Confirm-Password."
                  });
            };

            // if both same then hash the password -->

            const hashedpassword = await bcrypt.hash(password,10);

            // update the password
       const updatedUser =      await User.findByIdAndUpdate(checkToken._id,{password:hashedpassword},{new:true});
            
                const response = await mailSender(
                   updatedUser.email,
                      "Password for your account has been updated",
                  passwordUpdated(
                   updatedUser.email,
                 `Password Updated for ${ updatedUser.firstName} ${ updatedUser.lastName}`
                                         )
                    )   
           
             

             return res.status(200).json({
                 success:true,
                 message:"Passowrd Reset Successfully."
             })

          }catch(err){
              console.error(err);
              return res.status(500).json({
                 success:false,
                 message:"Error while reset Password."
              })
          }
}
