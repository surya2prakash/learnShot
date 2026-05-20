const Section = require("../../model/section");
const Course = require("../../model/course");

exports.createsection = async(req,res) =>{
        try{
           
            // sectionName and courseId from request.body
            const {sectionName,courseId} = req.body;

            console.log(sectionName,courseId);

            if(!sectionName){
                  return res.status(400).json({
                     success:false,
                     message:"Section Name required."
                  });
            };

            if(!courseId){
                 return res.status(400).json({
                     success:false,
                     message:"Course Id required."
                 });
            };

            const isCourseExist = await Course.findById(courseId);

            if(!isCourseExist){
                  return res.status(404).json({
                     success:false,
                     message:"Course is Missing."
                  });
            };

            const newSection = await Section.create({
                  sectionName:sectionName
                  
            });

           const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{sections:newSection?._id}},{new:true}).exec();

           return res.status(201).json({
               success:true,
               message:"Section Created.",
               data:updatedCourse
           })



        }catch(err){
              console.error(err);
              return res.status(500).json({
                 success:false,
                 message:"Error while Creating Section.Try again."
              })
        }
}