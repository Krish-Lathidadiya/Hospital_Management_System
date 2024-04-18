import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const navigateTo = useNavigate();
  const { storeTokenInLS } = useAuth();
  const {setAdminName}=useAuth()

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, role: "admin" }),
      });

      const res_data = await response.json();

      if (response.ok) {
        console.log("response data:",res_data)
        toast.success(res_data.message);
        storeTokenInLS(res_data.token);
        setAdminName(res_data.user.firstName)
        navigateTo("/DashBoard");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg px-10 py-8 mb-8">
        <form onSubmit={submitHandler}>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Login</h2>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={setData}
              placeholder="Enter email address"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={setData}
              placeholder="Enter your password"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </section>
  );
}

export default Login;
