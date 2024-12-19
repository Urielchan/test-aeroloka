import React, { useState } from "react";

const Navbar = () => {
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

          <div className="hidden lg:block">
            <a
              href="/login"
              className="flex items-center justify-center w-[105px] h-[48px] bg-[#7126B5] text-white rounded-[12px] text-sm font-medium hover:bg-purple-900"
            >
              <img
                src="/icons/fi_log-in.svg"
                alt="Login Icon"
                className="mr-2 h-5 w-5"
              />
              Masuk
            </a>
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
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Cari di sini ..."
              class="w-full h-[48px] bg-[#EEEEEE] pl-4 pr-14 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <img
              src="/icons/fi_search.svg"
              alt="Search Icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>
          <div>
            <a
              href="/login"
              className="flex items-center justify-center w-full h-[48px] bg-[#7126B5] text-white rounded-[12px] text-sm font-medium hover:bg-purple-800"
            >
              <img
                src="/icons/fi_log-in.svg"
                alt="Login Icon"
                className="mr-2 h-5 w-5"
              />
              Masuk
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
