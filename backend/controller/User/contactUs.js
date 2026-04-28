const contactUsEmail = require("../../utility/mailTemplate/contactFormRes");
const mailSender = require("../../utility/mailSender/mailsender");
const validator = require("validator");

exports.contactUs = async(req,res) =>{
       try{

        const{firstName,lastName,email,phoneNo,countryCode,message} = req.body ;

        if(!firstName || !lastName || !email || !phoneNo || !countryCode || !message){
                 return res.status(400).json({
                     success:false,
                     message:"All Fields required."
                 });
        };

        if(!validator.isEmail(email)){
               return res.status(401).json({
                 success:false,
                 message:"Not a vaild email."
               })
        }

        const response = await mailSender(
              email,
              "Your Data send successfully",
              contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
        );
        
        return res.status(200).json({
             success:true,
             message:"Email send successfully."
        })

       }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"Facing issue in contact us."
          })
       }
}