 const SubSection = require("../../model/subSection");
 
 const Course = require("../../model/course");
 const Category = require("../../model/category");
 const RatingAndReviews = require("../../model/ratingAndReviews");
 const User = require("../../model/user");
 const {uploadToCloudinary} = require("../../utility/uploadToCloudinary");

 require("dotenv").config();

exports.createcourse = async(req,res) =>{
      try{
        // courseName ,description , whatyouwilllearn,price ,tag,instruction,status
        const {courseName,description,whatYouWillLearn,price,tags,instruction,status,categoryId} = req.body;
             
    
        // userId from payload -->
           const userId = req.user.id;

          

           if(!courseName || !description || !whatYouWillLearn || !price || !categoryId || !instruction ){
                 return res.status(400).json({
                   success:false,
                   message:"All Fields are required."
                 });
           };
           
          //  thumbnail file from request files
           const thumbnail = req.files.thumbnailImage ;
                
           if(!thumbnail){
              return res.status(400).json({
                 success:false,
                 message:"Thumbnail file required."
              });
           };

           if(!status || status === undefined){
                 status='Draft'
           }

          //  check userId (instructor) ---> in doc 
           const instructorDetails = await User.findOne({_id:userId,accountType:'Instructor'});

           

           if(!instructorDetails){
              return res.status(404).json({
                 success:false,
                 message:"Instructor Not Found."
              });
           };
            
          //  check category by categoryId --> in doc 

          const isCategory = await Category.findById(categoryId);

          if(!isCategory){
              return res.status(404).json({
                 success:false,
                 message:"Category Not Found."
              });
          };

          const newTag = JSON.parse(tags);
          const newInstruction = JSON.parse(instruction);
 
        // upload thumnail to cloudinary --->

         const imageUpload = await uploadToCloudinary(thumbnail,process.env.THUMBNAIL_FOLDER);
          
       const newCourse = await Course.create({
                                                       courseName:courseName,
                                                       description:description,
                                                       whatYouWillLearn:whatYouWillLearn,
                                                       price:price,
                                                       status:status,
                                                       thumbnail:imageUpload.secure_url,
                                                       instructions:newInstruction,
                                                       tag:newTag,
                                                       instructorId:instructorDetails?._id
                                                 });

           
          //update the course into the category -->
          
          const updateCourseInCategory = await Category.findByIdAndUpdate(categoryId,{$push:{courseId:newCourse?._id}},{new:true});

          // update course in user (instructor) ;

          const updateCourseInUser = await User.findByIdAndUpdate(instructorDetails?._id,{$push:{courses:newCourse?._id}},{new:true});
        
          return res.status(201).json({
             success:true,
             message:"Course Create.",
             data:newCourse
          })


      }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"Error while Creating Course. Try again."
          })
      }
}