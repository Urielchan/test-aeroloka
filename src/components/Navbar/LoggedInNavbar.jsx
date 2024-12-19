import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const LoggedInNavbar = () => {
  const [isToggleMenuOpen, setToggleMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setToggleMenuOpen(!isToggleMenuOpen);
  };

  return (
    <>
      <nav className="w-full h-[84px] bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <div className="flex items-center">
            <a href="/">
              <img src="/images/logo.png" alt="Logo" className="h-[53px]" />
            </a>
          </div>

          <div className="flex-1 mx-8 hidden lg:block">
            <div className="relative w-full max-w-[444px]">
              <input
                type="text"
                placeholder="Cari di sini ..."
                className="w-full h-[48px] bg-[#EEEEEE] pl-4 pr-14 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <img
                src="/icons/fi_search.svg"
                alt="Search Icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>

          <div className="hidden lg:flex gap-6 ">
            <NavLink
              to="/order-history"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-500"
              }
              aria-label="Open List"
            >
              <img
                src="/icons/fi_list.svg"
                alt="list icon"
                className="w-6 h-6"
              />
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-500"
              }
              aria-label="Open Notification"
            >
              <img
                src="/icons/fi_bell.svg"
                alt="bell icon"
                className="w-6 h-6"
              />
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-500"
              }
              aria-label="Open User"
            >
              <img
                src="/icons/fi_user.svg"
                alt="user icon"
                className="w-6 h-6"
              />
            </NavLink>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMobileMenu}>
              <img
                src="/icons/fi_menu.svg"
                alt="Hamburger Menu Icon"
                className="h-[30px]"
              />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden bg-white shadow-md p-4 ${
            isToggleMenuOpen ? "" : "hidden"
          }`}
        >
          <div className="relative w-full max-w-[444px] mb-4">
            <input
              type="text"
              placeholder="Cari di sini ..."
              className="w-full h-[48px] bg-[#EEEEEE] pl-4 pr-14 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <img
              src="/icons/fi_search.svg"
              alt="Search Icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>
          <div className="flex gap-8">
            <NavLink
              to="/order-history"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-500"
              }
              aria-label="Open List"
            >
              <img
                src="/icons/fi_list.svg"
                alt="list icon"
                className="w-6 h-6"
              />
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-500"
              }
              aria-label="Open Notification"
            >
              <img
                src="/icons/fi_bell.svg"
                alt="bell icon"
                className="w-6 h-6"
              />
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-500"
              }
              aria-label="Open User"
            >
              <img
                src="/icons/fi_user.svg"
                alt="user icon"
                className="w-6 h-6"
              />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LoggedInNavbar;