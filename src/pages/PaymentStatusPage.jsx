import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import Stepper from "../components/Stepper/Stepper";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";

const PaymentStatusPage = () => {
  const navigate = useNavigate();

  // dummy
  const isPaymentSuccess = Math.random() < 0.5;

  useEffect(() => {
    if (isPaymentSuccess) {
      toast.success("Transaksi berhasil! Tiket Anda telah terbit.");
    } else {
      toast.error("Transaksi gagal! Silakan coba lagi.");
    }
  }, [isPaymentSuccess]);

  return (
    <>
      <LoggedInNavbar />
      <Stepper />
      <div className="mt-[90px] flex flex-col text-center items-center">
        <img
          src="images/cart_shopping_list.png"
          className="w-[204px] mb-5"
          alt="Payment Status"
        />
        <div className="mb-12">
          {isPaymentSuccess ? (
            <>
              <p className="text-[#7126B5] text-[14px] font-[500]">Selamat!</p>
              <p className="text-[14px] font-[500]">
                Transaksi Pembayaran Tiket Sukses!
              </p>
            </>
          ) : (
            <>
              <p className="text-[#FF0000] text-[14px] font-[500]">Maaf!</p>
              <p className="text-[14px] font-[500]">
                Transaksi Pembayaran Tiket Gagal.
              </p>
            </>
          )}
        </div>
        {isPaymentSuccess ? (
          <>
            <button className="w-[347px] py-2 bg-[#7126B5] text-white text-base font-[500] rounded-xl hover:bg-[#5c109c] mb-3">
              Terbitkan Tiket
            </button>

            <button
              className="w-[347px] py-2 bg-[#D0B7E6] text-white text-base font-[500] rounded-xl hover:bg-[#9e83b5] mb-3"
              onClick={() => navigate("/")}
            >
              Cari Penerbangan Lain
            </button>
          </>
        ) : (
          <button
            className="w-[347px] py-2 bg-[#D0B7E6] text-white text-base font-[500] rounded-xl hover:bg-[#9e83b5] mb-3"
            onClick={() => navigate("/")}
          >
            Cari Penerbangan Lain
          </button>
        )}
      </div>
    </>
  );
};

export default PaymentStatusPage;
