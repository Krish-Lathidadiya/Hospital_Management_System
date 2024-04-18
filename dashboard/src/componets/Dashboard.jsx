import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/getAllAppoientments",
        {
          method: "GET",
        }
      );

      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
        setAppointments(res_data.appointments);
      }
    } catch (error) {
      console.error("Appointments fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const {isLoggedIn} = useAuth();
  const {adminName} = useAuth();
  const {doctorCount}=useAuth();
  const {appointmentCount}=useAuth();

  //update status
  const handleUpdateStatus = async (appointmentId, status) => {

    try {
      console.log("Updating status:", status);

      if(isLoggedIn){

        const response = await fetch(
          `http://localhost:5000/updateAppointment/${appointmentId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          }
        );
  
        const res_data = await response.json();
        console.log(res_data);
      
        if (response.ok) {
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment._id === appointmentId
                ? { ...appointment, status }
                : appointment
            )
          );
          toast.success("status updates successfully")
          console.log(res_data.updateAppointment);
        }

      }else{
        toast.error("you are not authenticat to update")
      }

     

   
    } catch (error) {
      console.error("Status update error:", error);
    }

  };




  return (
    <>
      <section className="dashboard page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="/doc.png"
              alt="docImg"
              className="w-full h-[300px] object-cover mb-4 rounded-lg "
            />
            <div className="content">
              <div>
                <p>Hello,  {adminName ? <h5>{adminName}</h5> : null}</p>
              </div>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Total Appointments</p>
            <h3 className="text-2xl font-bold">{appointmentCount}</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Registered Doctors</p>
            <h3 className="text-2xl font-bold">{doctorCount}</h3>
          </div>
        </div>
        <div className="banner mt-8">
          <h5 className="text-lg font-semibold">Appointments</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Patient
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Doctor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Visited
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.appointment_date.substring(0, 16)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.hasVisited ? (
                          <GoCheckCircleFill className="text-green-500" />
                        ) : (
                          <AiFillCloseCircle className="text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      No Appointments Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer/>
      </section>
    </>
  );
};

export default Dashboard;
