const User = require("../../model/user");


exports.getuserdetails = async(req,res) =>{
      try{

        const id = req.user.id ;

        const isUserExist = await User.findById(id);

        if(!isUserExist){
             return res.status(404).json({
                  success:false,
                  message:"User Not Found."
             });
        };

        return res.status(200).json({
             success:true,
             message:"User Details",
             data:isUserExist
        })

      }catch(err){
          console.error(err);
          return res.status(500).json({
              success:false,
              message:"Internal Server Error."
          })
      }
}