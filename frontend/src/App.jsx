
import './App.css'

import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import Error from './pages/Error'
import VerifyEmail from './pages/VerifyEmail'
import UpdatePassword from './pages/UpdatePassword'
import Contact from './pages/Contact'
import About from './pages/About'
import Navbar from './components/Common/Navbar'
import MyProfile from './components/core/Dashboard/MyProfile'
import  Setting from "./components/core/Dashboard/settings/ProfileSetting"
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/Constants'


function App() {

  const {user} = useSelector(state=>state.profile);


  return (
    <div className='flex w-screen min-h-screen flex-col bg-richblack-900 font-inter'>
      <Navbar/>
          <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/about' element={<About/>} />

                {/* open routes --> for user who are not login yet --> */}
                <Route path='login' element={
                  <OpenRoute>
                       <Login/>
                  </OpenRoute>
                  }/>
                <Route path='signup' element={
                  <OpenRoute>
                       <Signup/>
                  </OpenRoute>
                  }/>
                <Route path='forget-password' element={
                  <OpenRoute>
                        <ForgetPassword/>
                  </OpenRoute>
                 
                  }/>
                
                <Route path='verify-email' element={
                  <OpenRoute>
                        <VerifyEmail/>
                  </OpenRoute>
                  }/>
                <Route path='update-password/:id' element={
                  <OpenRoute>
                       <UpdatePassword/>
                  </OpenRoute>                 
                  } />

                  {/* private routes --> if user is login then user can access private routes -->*/}

                  <Route element={
                    <PrivateRoute>
                      <Dashboard/>
                    </PrivateRoute>
                  }> 
                        <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
                        <Route path='/dashboard/settings' element={<Setting/>}/>
                  {/* this route is render when the user is instructor ---> */}
                  {
                     user?.accountType ===  ACCOUNT_TYPE.INSTRUCTOR && (
                      <>
                        {/* <Route path='dashboard/my-courses' element={} />
                        <Route path='dashboard/add-course' element={}/>
                        <Route path='dashboard/instructor' element={}/>
                        <Route path='dashboard/edit-course/:courseId' element={} /> */}
                      </>
                     )
                  }

                  {/* this route render when the user is student ---> */}

                  {
                       user?.accountType === ACCOUNT_TYPE.STUDENT && (
                           <>
                           {/* <Route path='dashboard/enrolled-courses' element ={} />
                           <Route path='/dashboard/cart' element={} /> */}
                           </>
                       )
                  }
                  

                  </Route>
                
                
              <Route path='*' element={<Error/>}/>
          </Routes>
    </div>
  )
}

export default App
