import React, { useState } from "react";
import { useAuth } from "../store/auth";

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewAdmin() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
  });

  const setData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const {isLoggedIn} = useAuth();


  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      if(isLoggedIn){

        const response = await fetch("http://localhost:5000/admin/addnew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
        toast.success(res_data.message);
        navigateTo("/Login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }

      }else{
        toast.error("You must be logged in")
      }
      

    } catch (error) {
      console.log("Admin Register Error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold font-serif">
        Add New Admin
      </h1>
      <div className="w-1/3 h-2 border-b-2 border-gray-900 rounded-md mx-auto my-3"></div>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={input.firstName}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={input.lastName}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={input.email}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={input.phone}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <label htmlFor="nic">NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={input.nic}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dob">DOB:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={input.dob}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={input.gender}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={setData}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          Add Now
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default AddNewAdmin;
