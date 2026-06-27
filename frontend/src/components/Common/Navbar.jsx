import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation} from 'react-router-dom'
import logo1 from "../../assets/Logo/logo-fullLight.png"
import {NavbarLinks} from "../data/navbar-links"
import { useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { ACCOUNT_TYPE } from '../../utils/Constants';
import ProfiledropDown from '../core/Auth/ProfiledropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { BsChevronDown } from "react-icons/bs"


export default function Navbar() {

      const location = useLocation();

      const matchRoute = (route) =>{
          return( matchPath({path:route},location.pathname)
      )
      }

      const {token} = useSelector((state)=>state.auth);
      const {user} = useSelector((state)=>state.profile);
      const {totalItems} = useSelector((state)=>state.cart) ;
       
      const [subLinks,setSubLinks] = useState([]);
     
     
      useEffect(()=>{
         (
              async()=>{
                try{
                   const result = await apiConnector("GET",categories.CATEGORIES_API)
                   setSubLinks(result?.data?.data);
                   
                }catch(error){
                  console.log("Could not fetch Categories.", error)
                }
              }
         )()
      },[]);

      console.log("sublinks",subLinks);

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
        <div className=' flex max-w-maxContent w-11/12 items-center justify-between'>
           
           {/* link logo */}

           <Link to={"/"} >
               <img src={logo1} alt='Logo' loading='lazy' height={32} width={160} />
           </Link>
          {/* nav links */}
           <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,idx)=>(
                             <li key={idx}>
                                 {
                                    link.title === 'Catalog' ? (<div className='group relative flex cursor-pointer items-center gap-1'>
                                        <p>{link.title}</p>
                                        <BsChevronDown/>
                                     <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                        <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'></div>
                                        
                                            {
                                              subLinks.length ? (<>
                                                   {
                                                    subLinks?.filter((sublink)=>sublink.courseId.length > 0) ?.map((sublink,idx)=>(
                                                         <Link to={`catalog/${sublink?.categoryName.split(" ").join("-").toLowerCase()}`} key={idx} >
                                                              <p>{sublink.categoryName}</p>
                                                         </Link>
                                                    ))
                                                   }
                                              </>) : (<p className='text-center'>No Course Found</p>) 
                                            }
                                        
                                        </div>   
                                    </div>):(<Link to={link?.path} >
                                        
                                            <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}>{
                                            link?.title
                                              }</p>
                                        
                                        </Link>)
                                 }
                             </li>
                        ))
                    }

                </ul>
           </nav>

           {/* buttons -> login , signup , dashboard  */}
          <div className='hidden items-center gap-x-4 md:flex'>
                {
                    user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {
                                totalItems > 0 && (<span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                    {totalItems}
                                </span>)
                            }
                        </Link>
                    ) 
                }

                {
                    token === null && (<Link to="/login">
                           <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 '>
                                 
                                    Log in
                                 
                           </button>
                    </Link>)
                }

                {
                    token === null && (<Link to="/signup">
                           <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 '>
                                 
                                    Sign up
                                 
                           </button>
                    </Link>)
                }

                {
                     token !== null && (
                        <ProfiledropDown/>
                     )
                }
          </div>
          <button className='mr-4 md:hidden'>
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>

        </div>
    </div>
  )
}
