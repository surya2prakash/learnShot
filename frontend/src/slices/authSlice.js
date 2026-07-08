 import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signup } from "../services/operations/authApi";


 const initialState = {
       signupData:null,
       loading:false,
       token:localStorage.getItem("token") ? (JSON.parse(localStorage.getItem("token"))) :null,
       error:{}
 };

 const authSlice = createSlice({
     name:"auth" ,
     initialState:initialState,
     reducers:{
         setToken (state,value){
             state.token = value.payload
         }
     },
     extraReducers:(builder)=>{
           builder
           .addCase(login.pending,(state)=>{
               state.loading = true
           })

           .addCase(login.fulfilled ,(state,action)=>{
                          console.log("action->",action);
                     state.loading = false;
                     state.token = localStorage.setItem("token",JSON.stringify(action.payload.token)) ;          
           })
           .addCase(login.rejected,(state,action)=>{
                  state.loading = false;
                  state.error =action.payload;
                  
           })

           .addCase(signup.pending,(state)=>{
                 state.loading = true;
           })

           .addCase(signup.fulfilled,(state,action)=>{
                   state.loading = false
                   state.signupData = action.payload.user
           })

           .addCase(signup.rejected,(state,action)=>{
                 state.error = action.payload 
           })

           .addCase(logout.pending,(state)=>{
                  state.loading = true
                   
                   localStorage.removeItem("token");
                   state.token=null;
           })

           .addCase(logout.fulfilled,(state,action)=>{
                  state.loading =false;
                  state.signupData =null;
           })

           .addCase(logout.rejected,(state,action)=>{
                state.error = action.error
           })
           
     }

 });

 export const {setToken} = authSlice.actions 

 export default authSlice.reducer 