import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../Common/IconBtn';
import { FiUpload } from "react-icons/fi"

export default function ChangeProfilePic() {
  
    const {user} = useSelector(state => state.profile);
    const [loading,setLoading] = useState(false);

    const fileInputRef = useRef(null);

  return (
    <div className='mx-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 py-5 text-richblack-5'>
        <div className='flex items-center justify-around gap-x-4'>
            <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'/>

            <div className='space-y-2'>
                <p>Change Profile Picture</p>

                <div className='flex flex-row gap-3'>
                    <input type='file' ref={fileInputRef}  accept='image/png ,image/jpeg , image/gif' className='hidden'/>
                    <button className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'>
                        Select
                    </button>
                  <div className='flex flex-row gap-2 relative'>
                    <IconBtn text={loading ? "Uploading..." :"Upload"}>
                        {
                         !loading && (
                              <FiUpload className='text-lg text-richblack-900'/>
                          )
                        }
                    </IconBtn>
                  
                          </div>
                </div>
            </div>
        </div>

    </div>
  )
}
