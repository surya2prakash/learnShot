const Category = require("../../model/category");


exports.getAllCategory = async(req,res) =>{
       try{
            
        
           const allCategory = await Category.find({});

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
} ;

exports.categoryPageDetails = async(req,res) =>{
         try{
            
             const {categoryId} = req.body ;

             if(!categoryId){
                  return res.status(400).json({
                      success:false,
                      message:"Category Id is missing."
                  })
             };

             const categoryDetail = await Category.findOne({_id:categoryId}).populate({
                 path:"courseId",
                 model:"Course",
                 match:{status:"Published"},
                 populate:{
                      path:"ratingAndReviews",
                      model:"RatingAndReviews"
                 }
             });

             if(!categoryDetail){
                return res.status(404).json({
                    success:false,
                    message:"Category Not found."
                })
             };

             if(categoryDetail?.courseId?.length === 0){
                 return res.status(404).json({
                    success:false,
                    message:"Not Course found for the selected categroy."
                 })
             };

            //  other category that except -> categroy Id 

            const categoriesExceptSelected = await Category.find({_id:{$ne:categoryId}});

            // get any random category course details -->
            let differentCategory = await Category.findOne({
              _id: categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            }).populate({
                path:"courseId",
                model:"Course"
            }).exec();




            // get all category -->

            const allCategory = await Category.find().populate({
                path:"courseId",
                model:"Course",
                match:"Published"
            }).exec();


            const allcourses = allCategory.flatMap((category)=> category?.courseId);
            const mostSellingCourse = allcourses.sort((a,b) => b.studentEnrolled.length - a.studentEnrolled.length).slice(0,10);

             return res.status(200).json({
                 success:true,
                 data:{
                      categoryDetail:categoryDetail,
                      differentCategory:differentCategory,
                      allCategory:mostSellingCourse
                 }
             });

         }catch(err){
            return res.status(500).json({
                success:false,
                message:"Internal Server Error."
            })
         }
}