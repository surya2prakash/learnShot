import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from '../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { VscSignOut } from "react-icons/vsc"
import { logout } from '../../../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Common/ConfirmationModal';
export default function Sidebar() {

    const {user,loading:profileLoading} = useSelector(state=>state.profile);
    const {loading:authLoading} = useSelector(state=>state.auth);

    const [confirmationModal,setConfirmationModal] = useState(null);

    const dispatch = useDispatch();
    const navigate= useNavigate();
   
    if(profileLoading || authLoading){
          return (
              <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                  <div className='spinner'></div>
              </div>
          )
    }
    
  return (
    <>
    <div className='flex h-[calc(100vh-3.5rem)] min-w-[300px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
        <div className='flex flex-col'>
              {
                sidebarLinks.map((link,idx)=>{
                      if(link?.type && user?.accountType !== link?.type){
                           return null
                      }
                      return(
                          <SidebarLink key={link?.id} link={link} iconName={link?.icon}/>
                      )
                 })  
              }
        </div>
        <div className='mx-2 mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'>
            <div className='flex flex-col'>
                   <SidebarLink link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear" />
                 
                 <button className='font-medium text-richblack-300 px-8 py-2'
                 onClick={
                   ()=> setConfirmationModal(
                    {
                        text1:"Are your sure ?",
                        text2 :"You will be logged out of your account.",
                        btnText1:"LogOut",
                        btnText2:"Cancel",
                        btn1Handler:()=> dispatch(logout({navigate})),
                        btn2Handler :()=> setConfirmationModal(null)
                    }
                   )

                   
                 }>
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>
                 </button>

            </div>
        </div>
    </div>
    {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
    }
    </>
  )
}
