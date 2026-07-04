import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {settingsEndPoints} from "../apis"
import { logout } from "./authApi";

const {CHANGEPASS_API,DELETE_PROFILE_API} = settingsEndPoints

export const  changePassword = createAsyncThunk(
      "setting/updatePassword",
      async({data},thunkAPI)=> {
        const toastId = toast.loading("Loading...");
            try{

                const response = await apiConnector("POST",CHANGEPASS_API,{
                    data
                });

                if(!response?.data?.success){
                  throw new Error(response?.data?.message);
                }

                console.log(response);
                toast.success("Password Updated")

                return response?.data

            }catch(error){
                   
                toast.error("Update Password failed.")
                return  thunkAPI.rejectWithValue(
                     error?.response?.data?.message || error?.message
                )
            }finally{
                  toast.dismiss(toastId);
            }
      }
);


export const deleteAccount = createAsyncThunk(
    "settings/deleteAccount",
    async({token,navigate},thunkAPI)=>{
        const toastId = toast.loading("loading...");
          try{
            const response = await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                 Authorization :`Bearer ${token}`
            });

            if(!response?.data?.success){
                  throw new Error(response?.data?.message);
            }
          
            thunkAPI.dispatch(logout(navigate));
            toast.success("Profile Deleted Successfully");

          }catch(error){
            toast.error("Could Not Delete Profile")
              return thunkAPI.rejectWithValue(
                error?.response?.data?.message || error?.message
              )
          }finally{
             toast.dismiss(toastId);
          }
    }
)