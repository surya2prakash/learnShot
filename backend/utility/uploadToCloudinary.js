
const cloudinary = require("cloudinary").v2

exports.uploadToCloudinary = async(file,folder,height,quality)=>{
           
            const options = {
                 folder
            }
              
            if(quality){
              options.quality = quality ;
            };

            if(height){
                options.height = height ;  
            };
               options.resourse_type ="auto"
              const result = await cloudinary.uploader.upload(file.tempFilePath,options)
               
                return result ;
           
};

