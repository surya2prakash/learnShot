

import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

import { courseEndPoints } from "../apis";

const {
   COURSE_CATEGORIES_API,
   COURSE_DETAILS_API,
   CREATE_COURSE_API,
   CREATE_RATING_API,
   CREATE_SECTION_API,
   CREATE_SUBSECTION_API,
   DELETE_COURSE_API,
   DELETE_SECTION_API,
   DELETE_SUBSECTION_API,
   GET_ALL_COURSE_API,
   GET_ALL_INSTRUCTOR_COURSE_API,
   GET_FULLCOURSE_DETAILS_AUTHENTICATED,
   UPDATE_SECTION_API,
   UPDATE_SUBSECTION_API,
   LECTURE_COMPLETION_API,
   EDIT_COURSE_API
}=courseEndPoints ;


// get All course ----->
export const getAllCourse = async()=>{
    const toastId = toast.loading("Loading...");
    let result = [];
       try{
            const response = await apiConnector("GET",GET_ALL_COURSE_API);

            if(!response?.data?.success){
                throw new Error("Could not fetch Course Category.");
            };

         result = response?.data?.data;
       }catch(error){
           console.log("Get All course api error -->",error);
           toast.error(error?.message);
       }finally{
          toast.dismiss(toastId);
          return result;
       }

};

export const fetchCourseDetails = async(courseId)=>{
       const toastId = toast.loading("Loading...");
         const result =[];
       try{
          
        const response = await apiConnector("POST",COURSE_DETAILS_API,{
            courseId
        });

        if(!response?.data?.success){
              throw new Error("Could Not Fetch Course Details.")
        };

        result = resposne?.data?.data;

       }catch(error){
          console.log("Get All Course api error -->",error);
          toast.error(error.message);
       }finally{
           toast.dismiss(toastId);
           return result;
       }
};

export const fetchCourseCategory =async()=>{
         const toastId = toast.loading("Loading...");
            const result = [];
         try{

            const response = await apiConnector("GET",COURSE_CATEGORIES_API);

            if(!response?.data?.success){
                 throw new Error("Could not fetch course Category");  
            };

            result = response?.data?.data;

         }catch(error){
              console.log("Get course Category api error -->",error);
              toast.error(error?.message);
         }finally{
              toast.dismiss(toastId);
              return result;
         }
};

export const addCourseDetails = async(data)=>{
           
    const toastId = toast.loading("Loading...");

          let result = [];
       try{
          const response = await apiConnector("POST",CREATE_COURSE_API,{
            data
          });

          if(!response?.data?.success){
               throw new Error("Could not Add course Details")
          };

          result = response?.data?.data;
       }catch(error){
            console.log("Add Course Details Api error")
            toast.error(error?.message);
       }finally{
            toast.dismiss(toastId);
            return result;
       }
};

export const editCourseDetails = async() =>{
      const toastId = toast.loading("Loading...");
       let result = null;
      try{

        const response = await apiConnector("POST",EDIT_COURSE_API);

        if(!response?.data?.success){
               throw new Error("Could not Edit course Details.")
        };

        result = response?.data?.data;

      }catch(error){
          console.log("edit course edit api --->",error);
          toast.error(error?.message);
      }finally{
           toast.dismiss(toastId);
           return result;
      }
}