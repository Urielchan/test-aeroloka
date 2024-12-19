import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";

const NotFound = () => {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  const handleBeranda = () => {
    navigate("/");
  };
  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />}
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col text-center items-center">
          <img
            src="images/cart_shopping_list.png"
            className="w-[204px] mb-5"
            alt="Payment Status"
          />
          <h2 className="mb-2">Halamannya belum tersedia nih.</h2>
          <button
            className="flex-1 flex items-center space-x-4 text-white bg-purple-500 p-2 rounded-lg"
            onClick={handleBeranda}
          >
            <FaArrowLeft />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
