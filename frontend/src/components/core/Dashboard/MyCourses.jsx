import React, { useState } from "react";
import IconBtn from "../../Common/IconBtn";
import { VscAdd } from "react-icons/vsc"
import CoursesTable from "./InstructorCourses/CoursesTable";
import { useNavigate } from "react-router-dom";


export default function MyCourses(){
    
    const[courses,setCourses] = useState([]);
    const navigate = useNavigate();

        return (
           <div >
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
                <IconBtn  text="New"
                  onClick={()=> navigate("/dashboard/add-course")} >
                      <VscAdd/>
                </IconBtn>
            </div>
            {
                courses && <CoursesTable courses={courses} setCourses={setCourses} />
            }

            </div>
        )
}