import React, { useState } from "react";
import IconBtn from "../../../Common/IconBtn";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {useForm} from 'react-hook-form'
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../services/operations/settingApi";
import { useNavigate } from "react-router-dom";



export default function UpdatePassword(){


    const [showPassword,setShowPassword]= useState(false);
    const [showNewPassword,setShowNewPassword] = useState(false);
      const {register,handleSubmit,formState:{errors}} = useForm();

      const dispatch = useDispatch();
      const navigate = useNavigate()

   function submitHandler(event,data){
    event.preventDefault();
    
           //  dispatch(changePassword(data))
       
   }

   console.log("new->",showNewPassword);
   console.log("old->",showPassword);

      return (
        <div>
           <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                 <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="oldPassword" className="label-style">
                               Current Password
                        </label>
                        <input type={showPassword ? "text" :"passowrd"} id="oldPassword"  placeholder="Enter Current Password" 
                           {
                            ...register("oldPassword",{required:true})
                           }
                           className="form-style"
                        />
                        {
                            errors.oldPassword &&  <span className="text-[12px] -mt-[1px]">Please Enter The Current Password</span>
                        }
                        <span onClick={()=>setShowPassword((prev)=>!prev)} className="absolute right-3 top-[40px] cursor-pointer z-[10px]">
                            {
                                showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                            }
                        </span>
                    </div>
                    <div className=" relative flex flex-col  gap-2 lg:w-[48%]">
                        <label className="text-richblack-5 text-[14px]" >
                            New Password
                             </label>
                             <input type={showNewPassword ? "text" :"password"}  placeholder="Enter New Password" 
                                {...register("newPassword",{required:true})}
                              className="form-style"/>
                             {
                                errors.newPassword &&  <span className="text-[12px] -mt-[1px]">
                                      Please Enter The New Password
                             </span>
                             }
                            
                             <span onClick={()=>setShowNewPassword((prev)=>!prev)} className="absolute right-3 top-[40px] cursor-pointer z-[100px]">
                                {
                                    showNewPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                                }
                             </span>
                       
                    </div>
                </div>
            </div>
            <div className="flex  justify-center gap-2 mb-2">
                <button onClick={()=>navigate("/dashboard/my-profile")}
                     className="rounded-md cursor-pointer px-2 py-2 font-semibold bg-richblack-700 text-richblack-50">
                    cancel
                </button>
                <IconBtn type="submit" text="Update"/>
                </div>
            </form>  
        </div>
      )
}