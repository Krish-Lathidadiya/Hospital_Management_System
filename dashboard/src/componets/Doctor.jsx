import React, { useState, useEffect } from "react";

import { useAuth } from "../store/auth";

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const { isLoggedIn } = useAuth();
  const {doctorCount,setDoctorCount}= useAuth();

  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = async () => {
    try {
      if (isLoggedIn) {
        const response = await fetch("http://localhost:5000/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await response.json();
        console.log(resData);

        if (response.ok) {
          console.log("doctors received successfully");
          setDoctors(resData.doctor);
        }
      } else {
        toast.error("You are not Authenticat person");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="page doctors p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        DOCTORS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
        
            <div key={doctor._id} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={doctor.docAvatar && doctor.docAvatar.url}
                alt="doctor avatar"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h4 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{`${doctor.firstName} ${doctor.lastName}`}</h4>
              <div className="text-sm md:text-base text-gray-600 mb-4">
                <p>Email: {doctor.email}</p>
                <p>Phone: {doctor.phone}</p>
                <p>DOB: {doctor.dob && doctor.dob.substring(0, 10)}</p>
                <p>Department: {doctor.doctorDepartment}</p>
                <p>NIC: {doctor.nic}</p>
                <p>Gender: {doctor.gender}</p>
              </div>
              
            </div>
          ))
        ) : (
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            No Registered Doctors Found!
          </h1>
        )}
      </div>
      <ToastContainer/>
    </section>
  );
}

export default Doctor;
