import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Navbar from '../componets/Navbar'

import Footer from '../componets/Footer'
import Home  from '../pages/Home'
import Appointment from '../pages/Appointment'
import AboutUs from '../pages/AboutUs'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import ErrorPage from '../pages/ErrorPage'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Router() {
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Appointment" element={<Appointment/>}/>
                <Route path="/AboutUs" element={<AboutUs/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Logout" element={<Logout/>}/>
                <Route path="/*" element={<ErrorPage/>}/>
            </Routes>
            <ToastContainer position='top-right'/>
          <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default Router