const Category = require("../../model/category");


exports.getAllCategory = async(req,res) =>{
       try{
           
        
           const allCategory = await Category.find([]);

           if(allCategory.length === 0){
                return res.status(404).json({
                     success:false,
                     message:"No Category Found."
                })
           };

           return res.status(200).json({
             success:true,
             message:"All Category found.",
             data:allCategory
           });
       


       }catch(err){
           console.error(err);
           return res.status(500).json({
             success:false,
             message:"Error while Get single Category. Try again."
           })
       }
} 