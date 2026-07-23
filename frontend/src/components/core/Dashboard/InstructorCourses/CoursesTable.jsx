import React, { useState } from 'react'
import {Table,Tr,Th,Thead,Tbody,Td}  from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { formatDate } from '../../../../services/formatDate';
import { COURSE_STATUS } from '../../../../utils/Constants';

import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../Common/ConfirmationModal';

export default function CoursesTable({courses,setCourses}) {



  const TRUNCATE_LENGTH = 30 ;

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [confirmationModal,setConfirmationModal] = useState(null);

  return (
    <div>
          <Table className='rounded-xl border border-richblack-800 w-11/12 '>
            <Thead className=''>
              <Tr className='flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2'>
                <Th className='flex-1 text-left text-sm font-medium uppercase text-richblack-100'>Courses</Th>
                <Th className='text-left text-sm font-medium uppercase text-richblack-100'>Duration</Th>
                <Th className='text-left text-sm font-medium uppercase text-richblack-100'>Price</Th>
                <Th className='text-left text-sm font-medium uppercase text-richblack-100'>Actions</Th>
              </Tr>

            </Thead>
            <Tbody>
                 {
                   courses.length === 0 ? (<Tr>
                      <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>
                           No Courses Found
                      </Td>
                   </Tr>) : (
                      courses.map((course,idx)=>(
                           <Tr key={course?.id} className='flex gap-x-10 border-b border-richblack-800 px-6 py-8'>
                            <Td className='flex flex-1 gap-x-4'>
                               <img src={course?.thumbnail} alt={course?.courseName}
                                 className='h-[148px] w-[220px] rounded-lg object-cover' />

                                 <div>
                                     <p>
                                        {course?.courseName}
                                     </p>
                                     <p>
                                        {course?.description.length > TRUNCATE_LENGTH ? (
                                           course?.description.split(0,TRUNCATE_LENGTH).join(" ") +"..."
                                        ) : (course?.description)}
                                     </p>
                                     <p>
                                        Created : {formatDate(course?.createdAt)}
                                     </p>

                                     {
                                       course?.status === COURSE_STATUS.DRAFT ? (
                                          <p>
                                            <HiClock size={14}/>
                                            Drafted
                                          </p>
                                       ) :(
                                         <p>
                                            <div>
                                              <FaCheck size={8}/>
                                            </div>
                                            Published
                                         </p>
                                       )
                                     }
                                 </div>
                            </Td>
                            <Td>
                               2hr 30min
                            </Td>
                           <Td>
                               ₹{
                                course?.price
                               }
                           </Td>

                           <Td>
                               <button  onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)} title='Edit' disabled={loading}>
                                      <FiEdit2/>
                               </button>
                               <button disabled={loading} 
                                   title='Delete'
                                   onClick={()=>setConfirmationModal(
                                      {
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      }
                                   )}
                                   >
                                <RiDeleteBin6Line size={20}/>
                               </button>
                           </Td>

                           </Tr>
                      ))
                   ) 
                 }
            </Tbody>
          </Table>
          {
            confirmationModal && <ConfirmationModal modalData={confirmationModal} />
          }
    </div>
  )
}
