import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState ={
    totalItems: localStorage.getItem("totalItems") ? (JSON.parse(localStorage.getItem("totalItems"))) : 0 ,
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [] ,
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0
};

const cartSlice = createSlice({
       name:"cart",
       initialState:initialState,
       reducers:{
        addToCart:(state,action)=>{
            //   need to add the course into card

            const course = action.payload ;
            // simply try to find out that the course is inside the cart or not

            const index = state.cart.findIndex((item)=>item?.id === course?.id);

            if(index>0){
                //  that means no need to re add the course into the cart

                toast.error("Course is already into the cart");
                return 
            };

            // if not inside the cart then we have to add the course into the cart --->
            state.cart.push(course);

            // increase the total items -->
               
              state.totalItems ++ 

            //increase the total price --->
            state.total += course?.price   

            // now update the localStorage -->
              
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("total",JSON.stringify(state.total));

               toast.success("Course add to Cart");
        },

         removeFromCart:(state,action)=>{
                   const course = action.payload
                 const index = state.cart.findIndex((item)=>item?.id === course?.id);
                   
                 if(index <= 0){
                        //  no such course is present into the cart

                        toast.error("No Course Present.")
                 };

                   

                   state.totalItems-- 
                    
                   state.total -=state.cart[index]?.price ;

                   state.cart.splice(index,1);

                   toast.success("Course removed from cart")
                   
                },

                resetCart:(state,action)=>{
                      state.cart = [];
                      state.total=0;
                      state.totalItems=0;

                    //   now remove the cart,total,totalItems from local storage --->

                    localStorage.removeItem("cart");
                    localStorage.removeItem("total");
                    localStorage.removeItem("totalItems");
                }

       }
});

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions ;

export default cartSlice.reducer ;