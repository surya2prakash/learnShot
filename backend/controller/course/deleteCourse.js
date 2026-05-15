const Course = require("../../model/course");
const Section = require("../../model/section");
const SubSection = require("../../model/subSection");
const Category = require("../../model/category");
const User = require("../../model/user");


exports.deletecourse = async(req,res) =>{
       try{

        const {courseId} = req.body ;

        if(!courseId){
             return res.status(400).json({
                  success:false,
                  message:"Course Id is missing."
             });
        };

        const isExist = await Course.findById(courseId);

            //course may have -> multiple section and multiple subsections  
            
            //  student enrolled in this course -->pull the course from their list

            const studentEnrolledId = isExist.studentEnrolled ;

            for(const studentId of studentEnrolled){
                      await User.findByIdAndUpdate(studentId,{$pull:{courses:courseId}});
            };

            for( const sectionId of isExist.sections ){
                    // now we get one section from here 
                    const section = await Section.findById(sectionId); 
                      if(section){
                      for(const subSectionId of section?.subSectionsId){
                              await SubSection.findByIdAndDelete(subSectionId);
                      };
                    }

                      await Section.findByIdAndDelete(sectionId);
            };
            // now pull course from category -->
               const pullFromCategory = await Category.findById(isExist.categoryId,{$pull:{courseId:isExist?._id}},{new:true});

            //    finally delete the course doc -->

                 await Course.findByIdAndDelete(courseId);

                 return res.status(200).json({
                       success:true,
                       message:"Course Removed."
                 });
       }catch(err){
           console.error(err);

           return res.status(500).json({
               success:false,
               mesaage:"Internal Server Error."
           })
       }
}