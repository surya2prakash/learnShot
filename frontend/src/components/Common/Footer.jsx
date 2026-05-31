import React from 'react'

import Logo from '../../assets/Logo/logo-fullDark.png'
import { Link } from 'react-router-dom'

import { FaFacebook ,FaGoogle  ,FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { FooterLink2 } from '../data/footer-link';

export default function Footer() {

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];    

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];

const Community = ["Forums", "Chapters", "Events"];

  return (
      <div className='bg-richblack-800'>

        {/* main section-1 */}
          <div className='max-w-maxContent w-11/12 flex lg:flex-row gap-8 justify-between items-center text-richblack-400 leading-6 mx-auto relative py-14'>

              <div className='border-b w-full flex flex-col lg:flex-row  pb-5'>
                {/* section 1. */}
                <div className='lg:w-[50%] flex lg:flex-row flex-wrap justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3'>
                     
                     <div className='flex flex-col w-[30%] lg:w-[30%] gap-3 mb-7 lg:pl-0'>
                         <img src={Logo} alt='' className='h-30 w-60 object-contain' />

                         <h1 className='text-richblack-50 font-semibold text-[16px]'>Company</h1>

                          <div className=' flex flex-col gap-2'>{
                            ["About", "Careers", "Affiliates"].map((ele,idx)=>(
                                   <div key={idx} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                   </div>
                            ))
                            }
                            </div> 

                         <div className='flex flex-row text-lg gap-3'>
                            <FaFacebook/>
                            <FaGoogle/>
                            <FaSquareXTwitter/>
                            <FaYoutube/>
                            </div>   

                            <div></div>
                     </div>

                     <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                        <h1 className='text-richblack-50 font-semibold text-[16px]'>Resourses</h1>

                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                Resources.map((ele,idx)=>(
                                      <div key={idx} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                      </div>
                                ))
                            }
                        </div>

                        <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>Support</h1>
                        <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                            <Link to={"/help-center"}>Help Center</Link>
                            
                        </div>
                     </div>

                     <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                        <h1 className='text-richblack-50 font-semibold text-[16px]'>Plans</h1>

                        <div className='flex flex-col gap-2 mt-2'>
                              {
                                Plans.map((ele,idx)=>(
                                    <div key={idx} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                    </div>
                                ))
                              }
                        </div>

                        <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>
                           Community
                        </h1>

                        <div className='flex flex-col gap-2 mt-2 '>
                            {
                                Community.map((ele,idx)=>(
                                    <div key={idx} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={ele.split(" ").join(" ").toLowerCase()}>{ele}</Link>
                                    </div>
                                ))
                            }
                        </div>
                     </div>

                     
                </div>
                {/* section 2. */}
                <div className='lg:w-[50%] flex flex-row  flex-wrap justify-between pl-3 lg:pl-5 gap-3'>
                     {
                        FooterLink2.map((ele,idx)=>(
                              <div key={idx} className='w-[48%] lg:w-[30%] mb-8 lg:pl-0'>
                                   <h1 className='text-richblack-50 font-semibold text-[16px]'>{ele.title}</h1>
                                    
                                    <div className='flex flex-col gap-2 mt-2'>
                                         {
                                            ele.links.map((element,index)=>{
                                                 return (
                                                     <div key={index}
                                                      className='cursor-pointer text-[14px] hover:text-richblack-50 transition-all duration-200'>
                                                          <Link to={element.link} >{element.title}</Link>
                                                     </div>
                                                 )
                                            })
                                         }
                                    </div>
                              </div>
                        ))
                     }
                </div>
              </div>
          </div>
          {/* Main section -2 */}
          <div className='max-w-maxContent w-11/12 text-richblack-400 mx-auto pb-14 text-sm flex flex-row items-center justify-between'>
             
             {/* section 1. */}
             <div className='w-full flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3'>

                <div className='flex flex-row gap-2'>
                     {
                        BottomFooter.map((ele,idx)=>(
                               <div key={idx}>
                                    {
                                      <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                    }
                               </div>
                        ))
                     }
                </div>

                <div className='text-center'>Made with ❤️ LearnShot © 2026</div>
             </div>

          </div>
       
      </div>
  )
}

