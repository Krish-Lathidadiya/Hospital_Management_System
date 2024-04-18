import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Appointment">Appointment</NavLink>
      <NavLink to="/AboutUs">AboutUs</NavLink>
    </>
  );
};

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="w-full flex justify-end mx-auto">
        <div className="hidden w-full md:flex justify-between"> 
            <Navbar />
        </div>

        {/* toggle button */}
        <div className="md:hidden text-center">
          <button onClick={toggleMenu} className="bg-blue-500 text-white px-3 py-2 rounded">
            {isMenuOpen ? 'X' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* isMenuOpen true code outside of navbar */}
      {isMenuOpen && (
        <div className="flex flex-col items-center mx-auto">
          <Navbar />
        </div>
      )}

    </div>
  );
};

export default Nav;
