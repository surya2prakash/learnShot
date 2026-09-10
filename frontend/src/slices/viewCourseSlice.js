import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNoOfLectures:0
}


const viewCourseSlice = createSlice({
      name:"viewCourse",
      initialState:initialState,
      reducers:{
            setCourseSectionData:(state,action)=>{
                 state.courseSectionData = action.payload
            },
            setCourseEntireData:(state,action) =>{
                  state.courseEntireData = action.payload
            },
            setTotalNoOfLectures:(state,action) =>{
                  state.totalNoOfLectures = action.payload
            },
            setCompleteLectures:(state,action) =>{
                    state.completedLectures = action.payload
            },
            updateCompleteLectures:(state,action) =>{
                    state.completedLectures = [...state.completedLectures,action.payload]
            }
               
      }

})

export const {setCompleteLectures,setCourseEntireData,setCourseSectionData,setTotalNoOfLectures,updateCompleteLectures} = viewCourseSlice.actions

export default viewCourseSlice.reducer ;