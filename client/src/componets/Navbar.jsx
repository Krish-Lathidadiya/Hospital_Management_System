import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isLoggedIn } = useAuth();

  return (
    <header>
      <nav className="flex flex-wrap sm:flex-row w-full h-16 mx-auto justify-between p-4 md:p-4 bg-gray-900 text-xl">
        <div className="ml-4">
          <NavLink to="/" className="text-white text-lg font-bold">
            ZeeCare
          </NavLink>
        </div>

        <div>
          <ul className="md:flex hidden space-x-5">
            <li>
              <NavLink to="/" className="text-white hover:text-gray-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Appointment"
                className="text-white hover:text-gray-300"
              >
                Appointment
              </NavLink>
            </li>
            <li>
              <NavLink to="/AboutUs" className="text-white hover:text-gray-300">
                AboutUs
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <ul className="md:flex hidden space-x-5 mr-4">
            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/Logout"
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/Register"
                    className="text-white hover:text-gray-300"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Login"
                    className="text-white hover:text-gray-300"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="md:hidden flex ">
          <button
            onClick={toggleMenu}
            className="bg-blue-500 text-white py-2 px-3 top-0 rounded"
          >
            {isMenuOpen ? "X" : "Menu"}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center py-5 bg-gray-900 text-white hover:text-gray-300 ">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Appointment">Appointment</NavLink>
          <NavLink to="/AboutUs">AboutUs</NavLink>
          {isLoggedIn ? (
            <NavLink to="/Logout">Logout</NavLink>
          ) : (
            <>
              <NavLink to="/Register">Register</NavLink>
              <NavLink to="/Login">Login</NavLink>
            </>
          )}
        </div>
      )}
      
    </header>
  );
}

export default Navbar;
