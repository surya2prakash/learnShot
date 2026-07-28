import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnector } from "../apiConnector";

import {profileEndPoints} from "../apis"
import toast from "react-hot-toast";


  const {GET_USER_ENROLLED_COURSE_API} = profileEndPoints ;

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


