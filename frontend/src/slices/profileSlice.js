import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../services/operations/authApi";


const initialState ={
      user:null,
      loading:false
};

const profileSlice = createSlice({
        name:"profile",
        initialState:initialState,
        reducers:{
            setUser(state,value){
               state.user =value.payload
            },
            setLoading(state,value){
                  state.loading = value.payload
            }
        },

        extraReducers:(builder)=>{
              builder
              .addCase(login.fulfilled,(state,action)=>{
                        state.user = action.payload.user
              })
              .addCase(logout.fulfilled,(state,action)=>{
                       state.user = null;
              })
        }


});

export const {setUser,setLoading} = profileSlice.actions ;

export default profileSlice.reducer ;

