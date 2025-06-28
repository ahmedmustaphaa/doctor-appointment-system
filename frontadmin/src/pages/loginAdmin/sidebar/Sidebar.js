import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiDashboardFill,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { IoPersonAddSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import logo from '../../../assets/si.webp';
import sidebarImage from '../../../assets/photo.jpg';

function Sidebar() {
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <RiDashboardFill /> },
    { to: '/allAppointment', label: 'All Appointment', icon: <TbBrandBooking /> },
    { to: '/adddoctor', label: 'Add Doctor', icon: <IoPersonAddSharp /> },
    { to: '/doctor-list', label: 'Doctor List', icon: <CiViewList /> },
  ];

  return (
    <div className="h-screen w-[240px] bg-white border-r shadow-sm flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 px-4 py-5 border-b">
          <img src={logo} alt="Logo" className="w-9 h-9 rounded-full" />
          <h1 className="font-bold text-lg text-blue-700">Health Care</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-3 flex flex-col gap-1">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium
              ${
                location.pathname === link.to
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              } transition`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar Image */}
      <div className="p-4">
        <img
          src={sidebarImage}
          alt="Sidebar Visual"
          className="hidden md:block  w-full h-32 object-cover rounded-lg shadow"
        />
      </div>
    </div>
  );
}

export default Sidebar;
