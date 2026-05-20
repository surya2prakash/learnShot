const Otp = require("../../model/otp");
const User = require("../../model/user");
const validator = require("validator");
const otpGenrate = require("otp-generator");


exports.sendOtp = async(req,res) =>{
      try{
         
        // destructure the email from body -->
        const {email} = req.body ;
       
        // not email then --->
        if(!email){
             return res.status(400).json({
                 success:false,
                 message:"Email required."
             })
        };

        // check vaild email -->
        if(!validator.isEmail(email.toLowerCase())){
             return res.status(400).json({
                 success:false,
                 message:"Not a valid Email."
             })
        };

        // check the user --->

        const isExist = await User.findOne({email:email.toLowerCase()});

        if(!isExist){
             return res.status(404).json({
                 success:false,
                 message:"User not Found."
             });
        };

        // genrate new otp -->
        let newOtp = otpGenrate.generate(6,{
              upperCaseAlphabets:false,
              lowerCaseAlphabets:false,
              specialChars:false
        });

        // check is otp present -->

        let checkOtp = await Otp.findOne({otp:newOtp}) ;

        // if new otp is present then genrate other -->

        while(checkOtp){

             newOtp = otpGenrate.generate(6,{
                 upperCaseAlphabets:false,              
             });

             checkOtp = await Otp.findOne({otp:newOtp})
        };
        
        const otpPayload = {email,otp:newOtp};
        //   save the new otp --->
        const letestOtp = await Otp.create(otpPayload);
        
        return res.status(200).json({
             success:true,
             message:"Otp send successfully.",
             data:newOtp
        });


      }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"Send Otp Failure. Try again ."
          })
      }
}