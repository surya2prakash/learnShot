import { apiConnector } from "../apiConnector"
import { endPoints,contactusEndPoint } from "../apis"
import {toast} from 'react-hot-toast'

import {createAsyncThunk} from '@reduxjs/toolkit'


const {LOGIN_API,SIGNUP_API,SENDOTP_API,RESTPASSTOKEN_API,RESTPASSWORD_API} = endPoints ;
const {CONTACT_US_API}= contactusEndPoint


export const login = createAsyncThunk(
       "auth/login",
       
       async ({email,password,navigate},thunkAPI) =>{
              
              try{

                const response = await apiConnector("POST",LOGIN_API,{
                   email,
                   password
                });

                if(!response?.data?.success){
                    throw new Error(response?.data?.message);
                }
                 
                const userImage = response?.data?.data?.image ?  response?.data?.data?.image :  `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.data?.firstName} ${response?.data?.data?.lastName}`
                 navigate("/dashboard/my-profile");
                   console.log(response?.data);
                   toast.success("Login successful..");
                   
                return {
                     token :response?.data?.token,
                     user :({...response?.data?.data,image:userImage})
                } ;

              }catch(error){
                     toast.error("Login failed.");
                   return thunkAPI.rejectWithValue(
                    error.response?.data?.message || error?.message
                   )
              }
       }
     
);

export const signup = createAsyncThunk(
       "auth/signup",
      async({email,firstName,lastName,password,confirmPassword,accountType,navigate},thunkAPI) =>{

           console.log(email,firstName,lastName,password,confirmPassword,accountType);
              try{
               
                const response = await apiConnector("POST",SIGNUP_API,{
                 email,firstName,lastName,password,confirmPassword,accountType
                });

                if(!response?.data?.success){
                    throw new Error (response?.data?.message);
                };
                
                
                toast.success(response?.data?.message);
                navigate("/login");
                return {user:response?.data?.data}
                

              }catch(error){
                toast.error("Signup Failed");
                navigate("/signup")
                   return thunkAPI.rejectWithValue(
                    error?.response?.data?.message || error?.message
                   )
              }
      }
);

export const sendOtp = createAsyncThunk(
      "auth/otp",
      async({email,navigate},thunkAPI)=>{
           try{
               
            const response = await apiConnector("POST",SENDOTP_API,{
            email
           });

          
           if(!response?.data?.success){
                throw new Error(response?.data?.message);
           }
               console.log(response);
               toast.success("Otp Send");

               navigate("/verify-email");
               
           return response?.data
           }catch(error){
                 toast.error("Could Not Send OTP");
                 return thunkAPI.rejectWithValue(
                  error?.response?.data?.message || error?.message
                 )
           }
      }
);


export const contactUs = async({firstName,lastName,email,phonenumber,countryCode,message,navigate})=>{
     try{
         console.log(email,firstName,lastName,phonenumber,countryCode,message);  
          const response = await apiConnector("POST",CONTACT_US_API,{
              firstName,
          lastName,
          email,
          phonenumber,
          message,
          countryCode
          });

          console.log(response);
          if(!response?.data?.success){
              throw new Error(response?.data?.message);
          }

          toast.success(response?.data?.message);
              navigate("/");
     }catch(error){
           console.error(error);
     }
};

export const getresetPasswordToken = createAsyncThunk(
      "auth/resetToken",
      async({email,setEmailSend},thunkAPI)=>{
             try{
                 const response = await apiConnector("POST",RESTPASSTOKEN_API,{
                    email
                 });

                 if(!response?.data?.success){
                     throw new Error(response?.data?.message);
                 };
                   toast.success("Reset Email Sent");
                 setEmailSend(true);
             }catch(error){
                toast.error("Failed To Send Reset Email")
                 return thunkAPI.rejectWithValue(
                      error?.response?.data?.message || error?.message
                 )
             }
      }
)

export const updateResetPassword = createAsyncThunk(
      "auth/updatePass",
      async({newPassword,confirmPassword,token,navigate},thunkAPI)=>{
             try{

               const response = await apiConnector("POST",RESTPASSWORD_API,{
                       newPassword,
                       confirmPassword,
                       token
               });

               if(!response?.data?.success){
                      throw new Error(response?.data?.message);
               }

                 toast.success("Rest Password Successfully.");

                 navigate("/login");

             }catch(error){
                 return thunkAPI.rejectWithValue(
                    error?.response?.data?.message || error?.message
                 )
             }
      }
);

export const logout = createAsyncThunk(
     "auth/logout",
     async({navigate},thunkAPI)=>{
         try{
            
          toast.success("Log-Out");
          navigate("/");
              
         }catch(error){
             return thunkAPI.rejectWithValue(
                  error?.response?.data?.message || error?.message
             )
         }
     }
)