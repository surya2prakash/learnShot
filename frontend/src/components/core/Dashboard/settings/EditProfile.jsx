import React from 'react'
import IconBtn from '../../../Common/IconBtn'


export default function EditProfile(){
      return(
       <div className='mx-5'>
         <form>
              <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 py-5'>
                <h2 className='text-lg text-richblack-5 font-semibold'>Profile Information</h2>
              </div>
              <div className='flex flex-col lg:flex-row gap-5'>
                <div className='flex flex-col lg:w-[48%] gap-2'>
                    <label htmlFor='firstName' className='label-style'>
                        First Name
                    </label>
                    <input type='text' placeholder='Enter first name' className='form-style' name='firstName' />
                </div>

                <div className='flex flex-col lg:w-[48%] gap-2'>
                    <label htmlFor='lastName' className='label-style'>
                        Last Name
                    </label>
                    <input type='text' placeholder='Enter last name' className='form-style' name='lastName'/>
                </div>

              </div>

              <div className='flex flex-col lg:flex-row gap-5'>
                  <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='dateOfBirth' className='label-style'>
                        Date Of Birth
                    </label>
                    <input type='date' className='form-style' name='dateOfBirth'/>
                  </div>
                  <div className='flex flex-col gap-2 lg:w-[48%]'>
                      {/* <label htmlFor='gender'>
                         Gender
                      </label>
                      <select type="text" name='gender'  className='form-style'>
                        {
                            genders.map((ele,idx)=>(
                                  <option key={idx} value={ele}>
                                         {
                                            ele
                                         }
                                  </option>
                            ))
                        }

                      </select> */}
                  </div>
                  
              </div>
              <div className='flex flex-col lg:flex-row gap-5'>
                   <div className='flex flex-col lg:w-[48%] gap-2'>
                    <label htmlFor='phoneNumber' className='label-style'>
                        Contact Number
                    </label>
                    <input type='tel' name='phoneNumber' placeholder='Enter Contact Number' className='form-style' />
                    </div>  
                    <div className='flex flex-col lg:w-[48%] gap-2'>
                        <label htmlFor='about' className='label-style'>
                             About
                        </label>
                        <input type='text' name='about' placeholder='Enter Bio Details' className='form-style'/>
                    </div>
                  </div>

                  <div className='flex justify-center gap-2 my-5'>
                    <button className='cursor-pointer rounded-md bg-richblack-700 text-richblack-50 py-2 px-5 font-semibold'>
                        Cancel
                    </button>

                    <IconBtn type="Submit" text="Save"/>
                  </div>
         </form>

       </div>

      )
}