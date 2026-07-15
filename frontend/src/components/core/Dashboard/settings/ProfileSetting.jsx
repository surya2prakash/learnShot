import React from 'react'
import ChangeProfilePic from './ChangeProfilePic'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

export default function Setting() {
  return (
    <div className='mx-2'>
           <h1 className='my-6 text-3xl font-medium text-richblack-5 text-center'>Edit Profile</h1>

           {/* Edit/change profile picture */}
             <ChangeProfilePic/>
           {/*Edit profile */}
              <EditProfile/>
           {/* password update */}
              <UpdatePassword/>
           {/* delete account */}
           <DeleteAccount/>
    </div>
  )
}
