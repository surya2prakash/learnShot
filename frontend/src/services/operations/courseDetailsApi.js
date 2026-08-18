

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
   
    const result = [];
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
             console.log("line 62 --->",response)
        result = response?.data?.data;

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
         
            let result = [];
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
          const response = await apiConnector("POST",CREATE_COURSE_API,data);

          if(!response?.data?.success){
               throw new Error("Could not Add course Details")
          };
            console.log(response);
          result = response?.data;
       }catch(error){
            console.log("Add Course Details Api error-->",error);
            toast.error(error?.message);
       }finally{
            toast.dismiss(toastId);
            
            return result;
       }
};

export const editCourseDetails = async(data) =>{
      const toastId = toast.loading("Loading...");
     
       let result = null;
      try{

        const response = await apiConnector("POST",EDIT_COURSE_API,data);

        if(!response?.data?.success){
               throw new Error("Could not Edit course Details.")
        };
         console.log(response);
        result = response?.data?.data;

      }catch(error){
          console.log("edit course edit api --->",error);
          toast.error(error?.message);
      }finally{
           toast.dismiss(toastId);
          
           return result;
      }
}

export const createSection = async(data)=>{
       
    const toastId = toast.loading("Loading...");
    

    let result = [];

       try{
             const response = await apiConnector("POST",CREATE_SECTION_API,{
                data
             });

             if(!response?.data?.success){
                  throw new Error("Could not create section");
             };
              console.log(response);
         result = response?.data?.data
       }catch(error){
            console.log(error);
            toast.error(error?.message);
       }finally{
            toast.dismiss(toastId);
          
            return result
       }
};

export const createSubSection = async(data)=>{
       
       const toastId = toast.loading("Loading...");
       
       let result = null  ;
        try{

          const response = await apiConnector("POST",CREATE_SUBSECTION_API,
               data
          );

          if(!response?.data?.success){
                throw new Error("Could not create Sub section");
          };

          result = response?.data?.data

        }catch(error){
            console.log("Create Sub Section api error -->",error)
            toast.error(error?.message)
        
        }finally{
            toast.dismiss(toastId)
           
            return result
        }
};

export const updateSection = async(data)=>{
       const toastId = toast.loading("Loading...");
      

       let result =null;

       try{

          const response = await apiConnector("PATCH",UPDATE_SECTION_API,
               data
          );

          if(!response?.data?.success){
                 throw new Error("Could not update section");
          };

          result = response?.data?.data ;

       }catch(error){
            toast.error(error?.message);
            console.log("Update Section api error -->",error);
       }finally{
            toast.dismiss(toastId);
           
            return result;
       }
};

export const updateSubSection = async(data)=>{
       const toastId = toast.loading("Loading...");
     
       let result =null ;

       try{

          const response = await apiConnector("PATCH",UPDATE_SUBSECTION_API,
               data
          );

          if(!response?.data?.success){
                 throw new Error("Could not update sub section");
          };

          result = response?.data?.data ;
       }catch(error){
            toast.error(error?.message);
            console.log("Update Sub Section api error -->",error);
       }finally{
            toast.dismiss(toastId);
          
            return result;
       }
};

export const deleteSection = async(data)=>{
        
        const toastId = toast.loading("Loading...");
        
        let result  ;

        try{
           const response = await apiConnector("DELETE",DELETE_SECTION_API,
               data
           );
             console.log("delete Section Call ->",response);
           if(!response?.data?.success){
                 throw new Error("Could not Delete section");
           };

           result = response?.data?.data ;

           console.log(result);
        }catch(error){
            toast.error(error?.message);
            console.log("Delete Section Api Error -->",error);
        }finally{
           toast.dismiss(toastId);
          
           return result ;
        }
};

export const deteleSubSection = async(data) =>{
        const toastId = toast.loading("Loading...");
       

        let result = null ;

        try{

          const response = await apiConnector("DELETE",DELETE_SECTION_API,data);

          if(!response?.data?.success){
                 throw new Error("Could not Delete Sub Section");
          };

          result = response?.data?.data

        }catch(error){
             console.log("Delete Sub Section Api Error --->",error);
             toast.error(error?.message);
        }finally{
             toast.dismiss(toastId);
           
             return result;
        }
};

export const deleteCourse = async(data) =>{
       const toastId = toast.loading("Loading...");
      
            console.log(data);
       let result = null ;

       try{

          const response = await apiConnector("DELETE",DELETE_COURSE_API,data);

          if(!response?.data?.success){
                 throw new Error("Could not Delete the Course");
          };

          result = response?.data;

       }catch(error){
            toast.error(error?.message);
            console.log("Delete Course Error Api -->",error);
       }finally{
             toast.dismiss(toastId);
             
             return result ;
       }
}

export const fetchInstructorCourse = async()=>{
     // this fetch the specific instructor all courses -->
     const toastId = toast.loading("Loading...");
     

     let result = null ;

     try{
          const response = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSE_API);

          if(!response?.data?.success){
                 throw new Error("Could not Get the instructor courses.");
          };

          result = response?.data?.data;
     }catch(error){
            toast.error(error?.message);
            console.error("Error while Instructor course api -->",error);
     }finally{
            toast.dismiss(toastId);
            
            return result;
     }
};

// geting full details of the course --->
export const detailsOfCourse = async(data)=>{
        const toastId = toast.loading("Loading...");
       

        let result =null;

        try{

          const response = await apiConnector("POST",GET_FULLCOURSE_DETAILS_AUTHENTICATED,data);

          if(!response?.data?.success){
               throw new Error("Could Not Get Details Of Course");
          }

          result = response?.data?.data ;

        }catch(error){

            toast.error(error?.message);
            console.log("Error in Details of course api -->",error);

     
        }finally{
            toast.dismiss(toastId)
            

            return result ;
        }
}

// api for marking the lecture complete -->

export const markLectureComplete = async(data)=>{
       const toastId = toast.loading("Loading...");
       

       let result = null ;

       try{
          const response = await apiConnector("POST",LECTURE_COMPLETION_API,data);

          if(!response?.data?.success){
                 throw new Error("Could not Mark Leacture complete.");
          };

         result = response?.data?.data
       }catch(error){

          toast.error(error?.message);
          console.log("Error while markLectureComplete Api -->",error)

       }finally{
             toast.dismiss(toastId);
             
             return result ;
       }
}

export const createRating = async(data) =>{
        const toastId = toast.loading("Loading...");
       

        let result = null ;

        try{

          const response = await apiConnector("POST",CREATE_RATING_API,data);

          if(!response?.data?.success){
                 throw new Error("Could not Create Rating")
          };

          result = response?.data?.data ;

        }catch(error){
            toast.error(error?.message);
            console.log("Error while Create Rating api -->",error);
        }finally{
            toast.dismiss(toastId);
           
            return result ;
        }
}