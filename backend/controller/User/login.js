const User = require("../../model/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.logIn = async(req,res) =>{
      try{
        //   destructure the email and password from request.body
        const {email,password} = req.body ;
        
        // check all fields
        if(!email || !password){
              return res.status(400).json({
                 success:false,
                 message:"All Fields are required."
              })
        };

        // check valid email --->
        if(!validator.isEmail(email)){
             return res.status(400).json({
                 success:false,
                 message:"Not a vaild Email."
             });
        };
          
        // check user --->
          const isExist = await User.findOne({email:email.toLowerCase()}).select("+password")

        //   if not exist then --->
          if(!isExist){
              return res.status(404).json({
                 success:false,
                 message:"User not Found."
              });
          };

        // if user found then check password --->

        const checkPassword = await bcrypt.compare(password,isExist.password);

        if(!checkPassword){
              return res.status(401).json({
                 success:false,
                 message:"Wrong Password.Try again."
              });
        };

        // before here , we check email in doc then match the password and the password is correct
        // now create token 

        // payload -->
        let payload ={
              email:isExist?.email,
              id:isExist?._id,
              role:isExist?.accountType
        };
//  three things in jwt -> payload , jwt secret , expires 
        const token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"})
         
         isExist.password = undefined;
         isExist.token = token ;

        //  send token through cookie -->
        //   three things in cookie -> name of token , token itself and options
         
        let options = {
              expires: new Date(Date.now() + 3*60*60*1000),
              httpOnly:true
        }

         res.cookie("token",token,options).status(200).json({
             success:true,
             message:"User Login.",
             data:{
                token:token,
                isExist
             }
         })



      }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"User can't be logIn. please try again."
          })
      }
}