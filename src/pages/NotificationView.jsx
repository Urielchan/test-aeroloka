import React, { useState } from "react";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import SubHeader from "../components/Header/SubHeader";
import Notification from "../components/Notification/Notification";
const NotificationView = () => {
  // dummy data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Promosi",
      title: "Dapatkan Potongan 50% untuk Tiket Penerbangan!",
      detail:
        "Syarat dan Ketentuan berlaku untuk tiket ke tujuan internasional.",
      date: "2024-12-09T14:00:00Z",
    },
    {
      id: 2,
      type: "Notifikasi",
      title: "Perubahan Jadwal Penerbangan untuk Kode Booking 45GT6",
      detail:
        "Jadwal penerbangan Anda telah berubah. Cek jadwal terbaru di aplikasi.",
      date: "2024-12-08T10:00:00Z",
    },
    {
      id: 3,
      type: "Promosi",
      title: "Diskon 30% untuk Tiket Penerbangan Domestik!",
      detail:
        "Promo hanya berlaku untuk penerbangan domestik hingga akhir bulan ini.",
      date: "2024-12-07T08:15:00Z",
    },
    {
      id: 4,
      type: "Notifikasi",
      title: "Pemberitahuan Pembatalan Penerbangan Kode Booking 23AB5",
      detail:
        "Penerbangan Anda telah dibatalkan. Silakan pilih penerbangan alternatif.",
      date: "2024-12-06T11:30:00Z",
    },
    {
      id: 5,
      type: "Promosi",
      title: "Beli 1 Tiket, Gratis 1 Tiket untuk Penerbangan Internasional!",
      detail:
        "Promo terbatas hingga 10 Desember. Pesan sekarang untuk dapatkan kesempatan ini!",
      date: "2024-12-05T16:45:00Z",
    },
    {
      id: 6,
      type: "Notifikasi",
      title: "Check-in untuk Penerbangan Kode Booking 88TR9 Dibuka",
      detail: "Jangan lupa melakukan check-in 24 jam sebelum penerbangan.",
      date: "2024-12-04T09:00:00Z",
    },
    {
      id: 7,
      type: "Promosi",
      title: "Promo Tiket Keluarga! Diskon 25% untuk 3 Tiket atau Lebih",
      detail: "Dapatkan diskon keluarga hanya di bulan Desember!",
      date: "2024-12-03T13:00:00Z",
    },
    {
      id: 8,
      type: "Notifikasi",
      title: "Pemberitahuan Perubahan Gate untuk Penerbangan 72GB",
      detail:
        "Gate penerbangan Anda telah berubah. Silakan periksa papan informasi di bandara.",
      date: "2024-12-02T17:30:00Z",
    },
    {
      id: 9,
      type: "Promosi",
      title: "Gratis Bagasi 20kg untuk Penerbangan ke Bali!",
      detail: "Promo berlaku hingga 15 Desember untuk tujuan Bali.",
      date: "2024-12-01T12:00:00Z",
    },
    {
      id: 10,
      type: "Notifikasi",
      title: "Reminder: Pembayaran Tiket Penerbangan Anda Belum Selesai",
      detail: "Segera selesaikan pembayaran agar tiket Anda tetap valid.",
      date: "2024-11-30T10:15:00Z",
    },
  ]);

  return (
    <>
      <LoggedInNavbar />
      <SubHeader label="Notifikasi"></SubHeader>
      {notifications.length === 0 ? (
        <div className="mt-[90px] flex flex-col text-center items-center">
          <img
            src="images/cart_shopping_list.png"
            className="w-[204px] mb-5"
            alt="Payment Status"
          />
          <h2>Belum ada notif nih.</h2>
        </div>
      ) : (
        <div className="mt-[90px] flex flex-col  items-center">
          {notifications.map((notification, index) => (
            <div key={notification.id} className="notification-container w-5/6">
              <Notification notification={notification} />

              {index < notifications.length - 1 && <hr className="my-4" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationView;
