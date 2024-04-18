import { useState } from "react";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Dashbord" ,to:"DashBoard"},
    { title: "Add New Admin", src: "Admin",to:"admin/addNew" },
    { title: "Add New doctor", src: "Doctor", to:"doctor/addNew", gap: true },
    { title: "Messages ", src: "Message" ,to:"Messages"},
    { title: "Doctors", src: "seeDoctors",to:"Doctor" },
    { title: "SignUP ", src: "Login",to:"Login", gap: true },
    { title: "Logout", src: "Logout" , to:"Logout" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray-900 h-screen p-5  pt-8 relative duration-300`}
      >
        {/* use image to toggel sidebar */}
        <img
          src="../src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src="../src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              key={index}
              to={`/${Menu.to}`} // Define the route path based on the src property
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
      ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
              activeClassName="bg-light-white" // Add a class for active link styling
            >
              <img
                src={`./src/assets/${Menu.src}.png`}
                className="h-6 w-8 rounded-sm"
              />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};
export default Home;
