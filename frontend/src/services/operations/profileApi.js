import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnector } from "../apiConnector";

import {profileEndPoints} from "../apis"
import toast from "react-hot-toast";


  const {GET_USER_ENROLLED_COURSE_API,GET_INSTRUCTOR_DATA_API,GET_USER_DETAILS_API} = profileEndPoints ;

export const getEnrolledCourses =   async()=>{
        const toastId = toast.loading("loading...");
      
        let result = [];
          try{

            const response = await apiConnector("GET",GET_USER_ENROLLED_COURSE_API,null)

            if(!response?.data?.success){
                 throw new Error (resposne?.data?.message);
            }

             console.log(response);

          }catch(error){
            console.error(error);
             
          }finally{
               toast.dismiss(toastId);
               return result ;
          }
    }


    export const getInstructorData = async () =>{
             const toastId = toast.loading("Loading...");
              
             let result = [];
             try{
                
              const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API);
                   
              if(!response?.data?.success){
                    throw new Error(response?.data?.message)
              }

              result = response?.data?.data ;
              
             }catch(error){
                 console.error(error);

             }finally{
                  toast.dismiss(toastId);
                    return result ;
             }
    }

