import React, { useState } from "react";
import { useAuth } from "../store/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewDoctor() {
  const departmentsArray = [
    "pediatrics",
    "orthopedics",
    "cardiology",
    "neurology",
    "oncology",
    "radiology",
    "physical therapy",
    "dermatology",
    "ent",
  ];
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: "",
  });

  const [docAvatar, setDocAvatar] = useState();
  const [docAvatarPreview, setDocAvatarPreview] = useState();

  const setData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const {isLoggedIn} = useAuth();

  //handle file
  const handleAvatar = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("nic", input.nic);
    formData.append("dob", input.dob);
    formData.append("gender", input.gender);
    formData.append("password", input.password);
    formData.append("doctorDepartment", input.doctorDepartment);
    formData.append("docAvatar", docAvatar);

    try {
      // const response = await fetch("http://localhost:5000/doctors/addNew", {
      //   method: "POST",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   body: JSON.stringify({...input,docAvatar}),
      // });

      if (isLoggedIn) {
        const response = await fetch("http://localhost:5000/doctors/addNew", {
          method: "POST",
          body: formData,
        });

        const res_data = await response.json();
        console.log(res_data);

        if (response.ok) {
          toast.success(res_data.message);
          navigateTo("/Doctor");
        } else {
          toast.error(
            res_data.extraDetails ? res_data.extraDetails : res_data.message
          );
        }

        
      } else {
        toast.error("You are not allowed to add");
      }
    } catch (error) {
      console.log("Add Doctor Error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold font-serif">
        Add New Doctor
      </h1>
      <div className="w-1/3 h-2 border-b-2 border-gray-900 rounded-md mx-auto my-3"></div>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <div className="mb-3">
            <img
              src={docAvatarPreview ? docAvatarPreview : "/docHolder.jpg"}
              alt="Doctor Avatar"
              className="object-cover h-[500px] w-full rounded-lg mb-2"
            />
            <input type="file" onChange={handleAvatar} />
          </div>
          <select
            name="doctorDepartment"
            value={input.doctorDepartment}
            onChange={setData}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          >
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={input.firstName}
            onChange={setData}
            placeholder="First Name"
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={input.lastName}
            onChange={setData}
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="text"
            id="email"
            name="email"
            value={input.email}
            onChange={setData}
            placeholder="Email"
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="text"
            id="phone"
            name="phone"
            value={input.phone}
            onChange={setData}
            placeholder="Phone"
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="text"
            id="nic"
            name="nic"
            value={input.nic}
            onChange={setData}
            placeholder="NIC"
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="date"
            id="dob"
            name="dob"
            value={input.dob}
            onChange={setData}
            placeholder="DOB"
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <select
            id="gender"
            name="gender"
            value={input.gender}
            onChange={setData}
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={setData}
            placeholder="Password"
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          >
            Add Now
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddNewDoctor;
