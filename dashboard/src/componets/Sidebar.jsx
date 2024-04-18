import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Dashbord", to: "/DashBoard" },
    { title: "Add New Admin", src: "Admin", to: "/admin/addNew" },
    { title: "Add New Doctor", src: "Doctor", to: "/doctor/addNew", gap: true },
    { title: "Messages", src: "Message", to: "/messages" },
    { title: "Doctors", src: "seeDoctors", to: "/doctor" },
    { title: "Sign Up", src: "Login", to: "/login", gap: true },
    { title: "Logout", src: "Logout", to: "/logout" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={` ${open ? "w-72" : "w-20 "} bg-slate-900 h-full p-5 pt-8 relative duration-300`}>
        {/* Toggle button */}
        <img
          src="../src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-purple-950 border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle"
        />

        {/* Logo */}
        <div className="flex gap-x-4 items-center">
          <img src="../src/assets/logo.png" className={`cursor-pointer duration-500 h-[100px]${open && "rotate-[360deg]"}`} alt="Logo" />
        </div>

        {/* Menu */}
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              key={index}
              to={Menu.to}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-white hover:text-gray-300 hover:underline  text-md font-bold items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
              activeClassName="text-red-700"
            >
              <img src={`./src/assets/${Menu.src}.png`} className="h-6 w-8 rounded-sm" alt={Menu.title} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
