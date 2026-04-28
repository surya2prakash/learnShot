const User = require("../../model/user");
const validator = require("validator");
const Otp = require("../../model/otp");
const bcrypt = require("bcrypt");
const Profile = require("../../model/profile");


exports.signup = async(req,res) =>{
       try{

        // step-1 :destructure --> email, name , password , confirm password ,account-type ,contact number ,otp from req body
           
          const {email,firstName,lastName,password,confirmPassword,accountType,contactNumber,otp} = req.body ;

        //   step-2 : check each field are there or not 
        if(!email || !firstName || !lastName || !password || !confirmPassword || !accountType || !contactNumber || !otp){
              return res.status(400).json({
                 success:false,
                 message:"All fields are required."
              });
        };
       
        // step-3 : check email is valid or not 
        if(!validator.isEmail(email)){
              return res.status(400).json({
                 success:false,
                 message:"Not vaild Email."
              });
        };

        // check password and confirm password match or not 
        if(password !== confirmPassword){
             return res.status(400).json({
                 success:false,
                 message:"Password is not match with Confirm-Password."
             });
        };

        if(!validator.isMobilePhone(contactNumber,"any")){
              return res.status(400).json({
                 success:false,
                 message:"Not vaild Number."
              });
        };

        // check is user already exist in db ? 

        const isExist = await User.findOne({email:email.toLowerCase() });

        if(isExist){
              return res.status(409).json({
                 success:false,
                 message:"User Already Exist."
              });
        };

        //  now find the most recent otp -->

        const recentOtp = await Otp.findOne({email:email.toLowerCase()}).sort({createdAt:-1});
      
        // if ->recentOtp length is 0 that means no otp is genrated.
        // else if -> recentOtp length is found but not match with input otp means not a valid otp .
        if(!recentOtp){
             return res.status(404).json({
                  success:false,
                  message:"Otp is not valid."
             });
        }else if(otp !== recentOtp.otp){
           return res.status(404).json({
             success:false,
             message:"Otp is not valid."
           });
        };

        // now hash the password -->

        const hashPassword = await bcrypt.hash(password,10);

        //flag 
        let approved = "" ;
          
        approved === "Instuctor" ? (approved = false):(approved = true);

        // create profile doc -->
      let profileDetails ;
        if(contactNumber){
             profileDetails = new Profile({
              dateOfBirth:null,
                gender:null,
                about:null,
              contactNumber:contactNumber
           })
        }else{
             profileDetails = new Profile({
              dateOfBirth:null,
                gender:null,
                about:null,
              contactNumber:null
           })
        };

        await profileDetails.save();
        
        // create user doc -->

        const user = await User.create({
               email:email,
               password:hashPassword,
               firstName:firstName,
               lastName:lastName,
               accountType:accountType,
               approved:approved,
               profileId:profileDetails._id,
               image:"" 

        });

    // return response -->
       return res.status(201).json({
         success:true,
         message:"User registered 🎉",
         data:user
       });


       }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"User can't be registered. please try again."
          })
       }
}
