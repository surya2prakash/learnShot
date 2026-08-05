import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from "../../../../Common/ConfirmationModal"
import { deleteSection, deteleSubSection } from '../../../../../services/operations/courseDetailsApi'
import { setCourse } from '../../../../../slices/courseSlice'

export default function NestedView({handleEditSectionName}) {

    const {course} = useSelector(state=>state.course);
    const dispatch = useDispatch();

    const[addSubSection,setAddSubSection] = useState(null);

    const[viewSubSection,setViewSubSection] = useState(null);

    const[editSubSection,setEditSubSection] = useState(null);

    const [confirmationModal,setConfirmationModal] = useState(null);


   async function handleDeleteSection(sectionId){
               console.log("Delete section Id --->",sectionId);
            const courseId = course._id;

            const result = await deleteSection({sectionId:sectionId,courseId:courseId});
                 console.log("section nestedview--->",result);
            if(result){
                 dispatch(setCourse(result))
            };
            setConfirmationModal(null);

    }

   async function handleDeleteSubSection(subSectionId,sectionId){
                   const courseId= course?._id ;

                   const result = await deteleSubSection({courseId:courseId,sectionId:sectionId,subSectionId:subSectionId});

                   if(result){

                    // update the course -> content 

                    const updateCourseContent = course?.sections.map((section,idx)=>(
                            section?._id === sectionId ? result : section 
                    ));

                      const updateCourseSection = {...course,sections:updatedCourseContent}
                      dispatch(setCourse(updatedCourseSection));
                   };

                   setConfirmationModal(null);
    }


    useEffect(()=>{
     console.log("Add sub section -->",addSubSection) ;
     console.log("sections-->",course?.sections);
    },[addSubSection])
    
    
  return (
    <div>
         <div className='rounded-lg bg-richblack-700 p-6 px-8'>
             {
              course?.sections.map((section,idx)=>(
                  <details key={section?._id}>
                      <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                        <div className='flex items-center gap-x-3'>
                           <RxDropdownMenu className='text-3xl text-richblack-50'/>
                           <p className='font-semibold text-richblack-50'>
                              {
                                section?.sectionName
                              }
                           </p>
                        </div>

                       <div className='flex items-center gap-x-3'>
                           <button onClick={()=>{handleEditSectionName(section._id,section?.sectionName)}}>
                              <MdEdit className='text-xl text-richblack-300'/>
                           </button>

                           <button onClick={()=> setConfirmationModal({text1:"Delete this Section?", text2:"All the  lecture of the section will be deleted" ,
                            btnText1:"Delete",
                            btnText2:"Cancel",
                            btn1Handler:()=> handleDeleteSection(section?._id),
                            btn2Handler:()=>setConfirmationModal(null)
                           })}>
                              <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                           </button>

                           <span className='font-medium text-richblack-300'>|</span>
                        <AiFillCaretDown className={`text-xl text-richblack-300`}/>
                        </div> 
                      </summary>

                      <div className='px-6 pb-4'>
                           {
                              section?.subSectionsId.map((subSection,idx)=>{
                                return(
                                  <div key={subSection?._id} className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                     onClick={()=>setViewSubSection(subSection)}
                                  >
                                       
                                       <div className='flex items-center gap-x-3 py-2'>
                                        <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                        <p className='font-semibold text-richblack-50'>{subSection?.title}</p>
                                       </div>

                                       <div className='flex items-center gap-x-3' onClick={(e)=>e.stopPropagation()}>
                                           <button onClick={()=> setEditSubSection({...subSection,sectionId:section.id})}>
                                                <MdEdit className='text-xl text-richblack-300'/>
                                           </button>

                                           <button onClick={()=> setConfirmationModal({
                                               text1:"Delete this Sub Section",
                                               text2:"This lecture will be deleted",
                                               btnText1:"Delete",
                                               btnText2:"Cancel",
                                               btn1Handler:()=>{handleDeleteSubSection(subSection._id,section?._id)},
                                               btn2Handler:()=>{setConfirmationModal(null)}
                                           })}>
                                             <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                           </button>
                                       </div>
                                  </div>
                                )
                              })
                           }
                        
                        {/* add lecture ---> */}
                        <button className='mt-3 flex items-center gap-x-1 text-yellow-50'
                            onClick={()=>setAddSubSection(section?._id)}
                           >
                             <FaPlus className='text-lg'/>
                             <p>Add Lecture</p>
                        </button>
                      </div>
                  </details>
              ))
             }
         </div>

         {
          addSubSection ? (<SubSectionModal
             modalData={addSubSection}
             setModalData={setAddSubSection}
             add={true}
          />) :(viewSubSection ? (<SubSectionModal 
              modalData={viewSubSection}
              setModalData={setViewSubSection}
              view={true}
          />):(editSubSection ? (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                 edit={true}
          />):(<></>)))
         }

         {
          confirmationModal ? (<ConfirmationModal modalData={confirmationModal}/>) : (<></>)
         }
    </div>
  )
}
