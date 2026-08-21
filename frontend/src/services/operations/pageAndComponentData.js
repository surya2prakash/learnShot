
import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiConnector';
import {catalogEndPoints} from"../../services/apis"

export const getPageCatalogData = async(categoryId) =>{
   const toastId = toast.loading("Loading...");        
           
    let result = [] ;
      
      try{

        const response = await apiConnector("POST",catalogEndPoints.CATALOG_DATA_API,
            {categoryId:categoryId}
        );
          console.log(response);
        if(!response?.data?.success){
              throw new Error("Could not Get CatalogData.")
        };
            
        result = response?.data?.data ;

      }catch(err){
           toast.error(err?.message);
           console.error("Error while Geting Page catalog Data ->",err);
      }finally{
        toast.dismiss(toastId);
        return result ;
      }
}