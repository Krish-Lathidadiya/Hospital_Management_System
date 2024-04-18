

import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer>
        <hr />
        <div className="w-full bg-gray-900  text-white flex flex-wrap flex-col md:flex-row justify-between px-4 pt-8 md:px-12">

          <div className="mx-auto w-50">
            <img src="/logo.png" alt="logo" className="logo-img"/>
          </div>

          <div className="mx-auto my-4" >
            <h4 className="font-bold  text-xl mt-4">Quick Links</h4>
            {/* <div className="h-1 w-full bg-black"></div> */}
            <div className="w-32 h-1  border-b-2 border-yellow-400 rounded-xl my-2"></div>
            <ul className="flex flex-col">
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>

          <div  className="mx-auto my-4">
            <h4 className="font-bold text-xl mt-4">Hours</h4>
            <div className="w-32 h-1  border-b-2 border-yellow-400 rounded-xl my-2"></div>
            <ul className="flex flex-col text text-sm">
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div  className="mx-auto my-4">
            <h4 className="font-bold  text-xl mt-4">Contact</h4>
            <div className="w-32 h-1  border-b-2 border-yellow-400 rounded-xl my-2"></div>
            <div>
              <FaPhone />
              <span>999-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>zeelab@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Karachi, Pakistan</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;