const BASE_URL =import.meta.env.VITE_BASE_URL;




// CATEGORY API ---->
export const categories = {
         CATEGORIES_API :BASE_URL + "/category"
}

//LOGIN API -->
export const endPoints ={
     LOGIN_API :BASE_URL +"/login",
      SIGNUP_API : BASE_URL +"/signup",
      SENDOTP_API:BASE_URL + "/sendotp",
      RESTPASSTOKEN_API:BASE_URL + "/reset-password-token",
      RESTPASSWORD_API:BASE_URL + "/reset-password",
      LOGOUT_API:BASE_URL + "/logout"
};

// contact us api -->

export const contactusEndPoint={
       CONTACT_US_API : BASE_URL + "/contact-Us"
}

// Setting page api -->

export const settingsEndPoints ={
       CHANGEPASS_API : BASE_URL +"/change-password",
       UPDATE_PROFILE_PIC_API :BASE_URL + "/updateProfilePic",
       UPDATE_PROFILE_API:BASE_URL + "/updateProfile",
       DELETE_PROFILE_API : BASE_URL + "/deleteProfile"

}

// profile api endpoints --->

export const profileEndPoints ={
         GET_USER_DETAILS_API:BASE_URL +"/getUserDetails",
         GET_USER_ENROLLED_COURSE_API:BASE_URL + "/getEnrolledCourses",
         GET_INSTRUCTOR_DATA_API: BASE_URL +"/instructorDashboard"
}

// course end points --->

export const courseEndPoints ={
         GET_ALL_COURSE_API :BASE_URL + "/getCourses" ,
         COURSE_DETAILS_API :BASE_URL +"",
         EDIT_COURSE_API :BASE_URL + "/editcourse",
         COURSE_CATEGORIES_API:BASE_URL + "/category",
         CREATE_COURSE_API : BASE_URL + "/createcourse" ,
         CREATE_SECTION_API :BASE_URL + "/addsection",
         CREATE_SUBSECTION_API :BASE_URL + "/addsubsection",
         UPDATE_SECTION_API :BASE_URL+ "/updatesection",
         UPDATE_SUBSECTION_API : BASE_URL + "/updatesubsection",
         GET_ALL_INSTRUCTOR_COURSE_API :BASE_URL + "/allinstructorcourses",
         DELETE_SECTION_API : BASE_URL + "/deletesection" ,
         DELETE_SUBSECTION_API : BASE_URL + "/deletesubsection",
         DELETE_COURSE_API : BASE_URL + "/deletecourse",
         GET_FULLCOURSE_DETAILS_AUTHENTICATED:BASE_URL+"/getFullCourseDetails",
         LECTURE_COMPLETION_API :BASE_URL +"",
         CREATE_RATING_API : BASE_URL + "/ratingandreview"
}


export const ratingEndPoints = {
           REVIEW_DETAILS_API : BASE_URL+"/getReviews"
}

export const catalogEndPoints ={
         CATALOG_DATA_API :BASE_URL + "/getCategoryPageDetails"
}