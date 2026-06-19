import React, { useState } from 'react'

import CountryCode from "../../data/countrycode.json"

export default function ContactUsForm() {

    const [formData,setFormData] =useState({
          firstName:"",
          lastName:"",
          email:"",
          phonenumber:"",
          message:"",
          countryCode:""
    });

    function changeHandler(e){
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]:e.target.value
            }
        ))   
    }

    function submitHandler(e){
           e.preventDefault();
           console.log(formData);
    }


    
  return (
    <div>
        <form className='flex flex-col gap-7' onSubmit={submitHandler}>
            <div className='flex flex-col lg:flex-row gap-5'>
               
              <label  className='flex flex-col gap-2 lg:w-[48%]'>
                   <p className='text-[14px] text-richblack-5'>First Name</p>
                  <input type='text' placeholder='Enter First Name' className='form-style'
                    name='firstName' value={formData.firstName}  onChange={changeHandler} required />
              </label>
              
            
              <label className='flex flex-col gap-2 lg:w-[48%]'>
                <p className='text-[14px] text-richblack-5'>Last Name</p>

                  <input type='text' placeholder='Enter Last Name' className='form-style' 
                   name='lastName' value={formData.lastName} onChange={changeHandler} required/>
              </label>
              
              </div>

              <div>
                  <label className='flex flex-col gap-2 '>
                      <p className='text-[14px] text-richblack-5'>Email Address</p>
                      <input type='email' placeholder='Enter Email Address' name='email' className='form-style'
                          value={formData.email} onChange={changeHandler} required/>
                  </label>

                 
              </div>

              <div className='flex flex-col gap-5'>
                <label className='text-[14px] text-richblack-5' htmlFor='phonenumber'>
                    Phone Number
                </label>
                <div className=' flex flex-col gap-5'>
                      <div className='flex flex-col gap-2 w-[50%] lg:w-[300px]'>
                        <select className='form-style' value={formData?.countryCode} onChange={changeHandler} required name='countryCode'>
                            <option value="" className='text-center'>Select Country Code</option>
                            
                            {
                              CountryCode.map((ele,idx)=>(
                                  <option key={idx} value={ele.code}>
                                        {ele.code}- {ele.country}
                                  </option>
                              ))
                            }
                              
                        </select>
                      </div>
                      <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                           <input type='number' placeholder='12345 67890' name='phonenumber'  className='form-style' onChange={changeHandler} value={formData.phonenumber} required />
                      </div>
                </div>
              </div>

              <div >
                   <label className='flex flex-col gap-2'>
                       <p className='text-[14px] text-richblack-5'>Message</p>
                       <textarea rows={7} cols={30} className='form-style' name='message' placeholder='Enter your message here...' value={formData.message} onChange={changeHandler} required/>
                   </label>
              </div>

              <button type='submit' className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]`}>
                    Send Message
              </button>
        </form>

    </div>
  )
}
