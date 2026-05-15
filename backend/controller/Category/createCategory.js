const Category = require("../../model/category");

exports.createcategory = async(req,res) =>{
        try{

            const {name,description} = req.body ;

            if(!name || !description){
                  return res.status(400).json({
                     success:false,
                     message:"All fields are required."
                  });
            };

            const newCategory = await Category.create({
                   categoryName:name.toLowerCase(),
                   description:description.toLowerCase()
            });

            return res.status(201).json({
                 success:true,
                 message:"Category Created Successfully."
            });

        }catch(err){
              console.error(err);
              return res.status(500).json({
                  success:false,
                  message:"Error while Create Category. Try again."
              })
        }
}