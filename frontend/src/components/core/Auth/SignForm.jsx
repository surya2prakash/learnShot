import React, { useState } from 'react'
import {ACCOUNT_TYPE} from '../../../utils/Constants'
import Tab from '../../Common/Tab';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function SignForm() {

     const [formData,setFormData] = useState({
         firstName:"",
         lastName:"",
         email:"",
         password:"",
         confirmPassword:""
     });

    //  Account type 

    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    // show password --->
    const [showPassword,setShowPassword] =useState(false);
    // show confirm password --->

    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

   function changeHandler(e){
           e.preventDefault();
           setFormData((prevData) =>({
            ...prevData,
                [e.target.name]:e.target.value
           }))
   }  ;

function submitHandler (e){
       e.preventDefault();

       console.log(formData);
};

const tabData=[{
      id:1,
      tabName:"Student",
      tabType:ACCOUNT_TYPE.STUDENT
},
{
    id:2,
    tabName:"Instructor",
    tabType:ACCOUNT_TYPE.INSTRUCTOR
}]

  return (
  <div> 
    <Tab tabData={tabData} setField={setAccountType} field={accountType}/>
    <form className='flex w-full flex-col gap-y-4' onSubmit={submitHandler}>
        <div className='flex gap-x-4'>
        <label>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
               First Name
            </p>
            <input type='text' name='firstName' placeholder='Enter first name' required className='form-style w-full' 
                 onChange={changeHandler} value={formData?.firstName}/>
        </label>

        <label >
            <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>
                 Last Name
            </p>

            <input type='text' name='lastName' placeholder='Enter last name' required className='form-style w-full'
                onChange={changeHandler} value={formData?.lastName}/>
        </label>
        </div>
        <label className='w-full'>
            <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>
                Email Address
            </p>
            <input type='' name='email' placeholder='Enter email address' required  className='form-style -w-full'
                onChange={changeHandler} value={formData?.email}/>
        </label>
        <div className='flex gap-x-4'>
        <label className='relative'>
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                 Create Password
              </p>
               
              <input type={showPassword ? "text" :"password"} name='password' placeholder='Enter Password' required 
                 className='w-full form-style pr-10!' onChange={changeHandler} value={formData?.password} />
                 <span className='absolute right-4 top-[38px] z-[10px]' onClick={()=> setShowPassword((prev)=> !prev)}>
                    {
                      showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>  : <AiOutlineEye fontSize={24} fill='#AFB2BF'/> 
                    }
                 </span>
              
        </label>

        <label className='relative'>
               <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                   Confirm Password
               </p>
               <input type={showConfirmPassword ? 'text' : "password"} name='confirmPassword' placeholder='Confirm Password'  required
                className='form-style w-full pr-10!' onChange={changeHandler} value={formData?.confirmPassword}/>
               <span className='absolute right-4 top-[38px] z-[10px]' onClick={()=> setShowConfirmPassword((prev)=> !prev)}>
                    {
                      showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>  : <AiOutlineEye fontSize={24} fill='#AFB2BF'/> 
                    }
                 </span>

                
        </label>
         </div>
         <button type='submit' className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 cursor-pointer'>
                Create Account
         </button>

    </form>
    </div> 
  )
}

