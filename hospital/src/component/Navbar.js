import React, { useState } from 'react';
import logo from '../assets_frontend/logo.png'; 
import dropdownIcon from '../assets_frontend/dropdown_icon.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppContext } from '../context/Context.js';

function Navbar() {
  const [dropDown, setDropdown] = useState(false);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const { token, setToken } = useAppContext();

  const handleLogout = () => {
    setToken(false);
    localStorage.removeItem('atoken');
    navigate('/login');
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/doctor', label: 'Doctor' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <div className="flex justify-between items-center py-4 px-6 md:px-10 bg-white shadow-md border-b border-blue-100 relative z-50">
      {/* Logo */}
      <img
        src={logo}
        className="w-40 md:w-44 cursor-pointer"
        alt="Logo"
        onClick={() => navigate('/')}
      />

      {/* Hamburger Icon - Mobile */}
      <button
        className="block md:hidden text-2xl text-gray-700"
        onClick={() => setToggle(!toggle)}
      >
        <RxHamburgerMenu />
      </button>

      {/* Navigation Links */}
      <ul
        className={`${
          toggle ? 'hidden' : 'flex'
        } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 absolute md:static top-20 right-4 bg-white md:bg-transparent shadow-md md:shadow-none w-48 md:w-auto p-4 md:p-0 rounded-lg transition-all duration-300`}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            onClick={()=>setToggle(true)}
            className={({ isActive }) =>
              `capitalize font-medium text-gray-700 hover:text-blue-600 transition ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      {token ? (
        <div className="flex items-center gap-4 relative">
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={require('../assets_frontend/profile_pic.png')}
            alt="Profile"
          />
          <img
            src={dropdownIcon}
            alt="Dropdown"
            className="w-4 h-4 cursor-pointer"
            onClick={() => setDropdown(!dropDown)}
          />
          {/* Dropdown Menu */}
          {dropDown && (
            <div className="absolute top-14 right-0 w-40 bg-white rounded-md shadow-lg py-2 text-sm text-gray-700">
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/myprofile')}
              >
                My Profile
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/appointments')}
              >
                Appointments
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="hidden md:inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
        >
          Create Account
        </button>
      )}
    </div>
  );
}

export default Navbar;
