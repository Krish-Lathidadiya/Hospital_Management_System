
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import AddNewAdmin from '../componets/AddNewAdmin'
import AddNewDoctor from '../componets/AddNewDoctor'
import Dashboard from '../componets/Dashboard'
import Doctor from '../componets/Doctor'
import Login from '../componets/Login'
import Messages from '../componets/Messages'
import Logout from '../componets/Logout'
import SidebarWithBurgerMenu from '../componets/Home'
import Sidebar from '../componets/Sidebar'


function Router() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-5">
          <Routes>
            <Route path='/doctor/addNew' element={<AddNewDoctor />} />
            <Route path='/admin/addNew' element={<AddNewAdmin />} />
            <Route path='/DashBoard' element={<Dashboard />} />
            <Route path='/Doctor' element={<Doctor />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Messages' element={<Messages />} />
            <Route path='/Logout' element={<Logout />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
