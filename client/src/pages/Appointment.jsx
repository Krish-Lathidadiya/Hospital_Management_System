import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Appointment() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    hasVisited: false,
    address: "",
  });
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [doctors, setDoctors] = useState([]);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("patientToken"); // Assuming you stored the token in localStorage

      if (!token) {
        console.log("Your not Authenticated please login");
        return;
      }

      const response = await fetch("http://localhost:5000/postAppointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          ...input,
          department: department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
        }),
      });

      const resData = await response.json();
      console.log(resData);

      if (response.ok) {
        toast.success("Appointment posted successfully");
      } else {
        toast.error(
          resData.extraDetails ? resData.extraDetails : resData.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setData = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setDoctors(data.doctor);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold font-serif mb-8">
        Post Appointment
      </h1>
      <form onSubmit={submitHandler}>

        {/* row-1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={input.firstName}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={input.lastName}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        {/* row-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={input.email}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={input.phone}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        {/* row-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <label htmlFor="nic">NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              placeholder="Enter your NIC number"
              value={input.nic}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dob">DOB:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              placeholder="Select your date of birth"
              value={input.dob}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        {/* row-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={input.gender}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="appointment_date">Appointment Date:</label>
            <input
              type="date"
              id="appointment_date"
              name="appointment_date"
              placeholder="Select appointment date"
              value={input.appointment_date}
              onChange={setData}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        {/* row-5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="flex flex-col">
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            >
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="address">Address:</label>
          <textarea
            cols="30"
            rows="5"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={input.address}
            onChange={setData}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
        </div>
        <div className="my-3">
          <label htmlFor="hasVisited">Have you visited before?</label>
          <input
            type="checkbox"
            id="hasVisited"
            name="hasVisited"
            checked={input.hasVisited}
            onChange={setData}
            className="mt-1"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Appointment;
