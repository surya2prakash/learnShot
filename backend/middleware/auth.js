const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

exports.auth = async(req,res,next) =>{
      try{
         
        //  extract the token from cookies or body or header 
          let token = req.cookies.token || req.body.token || req.header("Authorization").split(" ")[1] ;

        // check if token is not in body or cookies then --> 
            if(!token){
                   
                  return res.status(400).json({
                             success:false,
                             message:"Token is missing."
                         });
                    
            };

            // here we get the token now verify the token -->

         const decode = await jwt.verify(token,process.env.JWT_SECRET);
        
         if(!decode){
              return res.status(401).json({
                 success:false,
                 message:"token invalid."
              })
         }
        //   store the decode jwt payload  for futher use ---> 
         req.user = decode ;

        next();


      }catch(err){
         console.error(err);
         return res.status(500).json({
             success:false,
             message:"Error while Validating the Token."
         })
      }
    };

    // Authorization --->

    // Admin , Student , Instructor 

    exports.isAdmin = async(req,res,next) =>{
             try{

                const userId = req.user.id ;
                
                // check the user in db by Id --->
                const isExist = await User.findById(userId);
                 
                if(!isExist){
                     return res.status(404).json({
                         success:false,
                         message:"User Not Found."
                     });
                };

                if(isExist.accountType !== 'Admin'){
                      return res.status(403).json({
                         success:false,
                         message:"Unauthorized,Protected route for Admin."
                      });
                };

                next();
             }catch(err){
                 console.error(err);
                 return res.status(500).json({
                    success:false,
                    message:"Error While validating the Protected route for Admin Role. Try again."
                 })
             }
    };

    exports.isInstructor = async(req,res,next) =>{
           try{
           
            const userId = req.user.id ;

            // check in db -->

            const isExist = await User.findById(userId);

            if(!isExist){
                  return res.status(404).json({
                      success:false,
                      message:"User not found."
                  })
            };

            if(isExist.accountType !== "Instructor"){
                  return res.status(403).json({
                     success:false,
                     message:"UnAuthorized,This Protected Route For Instructor Only."
                  });
            };
             
             next();

           }catch(err){
              console.error(err);
              return res.status(500).json({
                 success:false,
                 message:"Error while validating the protected route for Instructor Role.Try again."
              })
           }
    };

    exports.isStudent = async(req,res) =>{
           try{

               const userId = req.user.id ;

               const isExist = await User.findById(userId);

               if(!isExist){
                   return res.status(404).json({
                     success:false,
                     message:"User not found."
                   });
               };

               if(isExist.accountType !== 'Student'){
                  return res.status(403).json({
                       success:false,
                       message:"Unauthorized,This Protected Route for Student Only."
                  });
               };

               next();

           }catch(err){
               console.error(err)
               return res.status(500).json({
                 success:false,
                 message:"Error while validating the protected route for Student Role. Try again."
               })
           }
    }