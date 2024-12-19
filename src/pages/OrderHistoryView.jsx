import React, { useState } from "react";
import OrderCard from "../components/Card/OrderCard";
import OrderDetailCard from "../components/Card/OrderDetailCard";
import Navbar from "../components/Navbar/Navbar";
import HeaderOrder from "../components/Header/HeaderOrder";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailView, setDetailView] = useState(false);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredDate, setFilteredDate] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");

  const handleOrderCardClick = (ticket) => {
    setSelectedOrder(ticket);
    if (window.innerWidth < 768) setDetailView(true);
  };

  const handleBackToList = () => {
    setDetailView(false);
  };
  const handleLocationSearch = (location) => {
    setSearchLocation(location.toLowerCase());
  };
  const handleDateFilter = (date) => {
    setFilteredDate(date);
    console.log("Tanggal yang dipilih:", date);
  };

  const formatCurrency = (value) => `IDR ${value.toLocaleString("id-ID")}`;

  const handleAddFlight = (flight) => {
    if (!flight.departureDate) {
      console.error("Tiket tidak valid: departureDate tidak ditemukan.");
      return;
    }
    setSelectedFlights((prev) => [...prev, flight]);
  };

  const mockTickets = [
    {
      departureCity: "Jakarta",
      departureLocation: "Soekarno-Hatta International Airport (CGK)",
      departureDate: "5 Maret 2023",
      departureTime: "19:10",
      arrivalCity: "Melbourne",
      arrivalLocation: "Melbourne Airport (MEL)",
      arrivalDate: "5 Maret 2023",
      arrivalTime: "21:10",
      duration: "4h 0m",
      bookingCode: "6723y2GHK",
      classType: "Economy",
      airline: "Garuda Indonesia",
      flightCode: "GA721",
      price: 9850000,
      priceDetails: [
        { label: "2 adults", value: formatCurrency(9000000) },
        { label: "0 baby", value: formatCurrency(0) },
        { label: "tax", value: formatCurrency(500000) },
      ],
      totalPrice: formatCurrency(9850000),
      status: "Issued",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Jakarta",
      departureLocation: "Soekarno-Hatta International Airport (CGK)",
      departureDate: "1 Maret 2023",
      departureTime: "07:00",
      arrivalCity: "Bali",
      arrivalLocation: "Ngurah Rai International Airport (DPS)",
      arrivalDate: "1 Maret 2023",
      arrivalTime: "08:15",
      duration: "1h 15m",
      bookingCode: "67562320G",
      classType: "Business",
      airline: "Lion Air",
      flightCode: "JT320",
      price: 3250000,
      priceDetails: [
        { label: "2 adults", value: formatCurrency(2900000) },
        { label: "0 baby", value: formatCurrency(0) },
        { label: "tax", value: formatCurrency(300000) },
      ],
      totalPrice: formatCurrency(3250000),
      status: "Unpaid",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Jakarta",
      departureLocation: "Soekarno-Hatta International Airport (CGK)",
      departureDate: "11 Februari 2023",
      departureTime: "07:00",
      arrivalCity: "Medan",
      arrivalLocation: "Kualanamu International Airport (KNO)",
      arrivalDate: "11 Februari 2023",
      arrivalTime: "08:15",
      duration: "1h 15m",
      bookingCode: "601U95667G",
      classType: "Economy",
      airline: "Citilink",
      flightCode: "QG101",
      price: 2950000,
      priceDetails: [
        { label: "2 adults", value: formatCurrency(2600000) },
        { label: "0 baby", value: formatCurrency(0) },
        { label: "tax", value: formatCurrency(350000) },
      ],
      totalPrice: formatCurrency(2950000),
      status: "Cancelled",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Medan",
      departureLocation: "Kualanamu International Airport (KNO)",
      departureDate: "8 Februari 2023",
      departureTime: "17:00",
      arrivalCity: "Palu",
      arrivalLocation: "Mutiara SIS Al-Jufrie Airport (PLW)",
      arrivalDate: "8 Februari 2023",
      arrivalTime: "19:05",
      duration: "2h 05m",
      bookingCode: "356875O9UD",
      classType: "Business",
      airline: "Sriwijaya Air",
      flightCode: "SJ215",
      price: 4060000,
      priceDetails: [
        { label: "2 adults", value: formatCurrency(3800000) },
        { label: "0 baby", value: formatCurrency(0) },
        { label: "tax", value: formatCurrency(150000) },
      ],
      totalPrice: formatCurrency(4060000),
      status: "Issued",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Surabaya",
      departureLocation: "Juanda International Airport (SUB)",
      departureDate: "10 Januari 2023",
      departureTime: "10:00",
      arrivalCity: "Makassar",
      arrivalLocation: "Sultan Hasanuddin International Airport (UPG)",
      arrivalDate: "10 Januari 2023",
      arrivalTime: "12:15",
      duration: "2h 15m",
      bookingCode: "123456789",
      classType: "Economy",
      airline: "AirAsia",
      flightCode: "QZ501",
      price: 2100000,
      priceDetails: [
        { label: "2 adults", value: formatCurrency(1900000) },
        { label: "0 baby", value: formatCurrency(0) },
        { label: "tax", value: formatCurrency(150000) },
      ],
      totalPrice: formatCurrency(2100000),
      status: "Issued",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
  ];

  const filteredTickets = mockTickets.filter((ticket) => {
    const isDateMatched = selectedDate
      ? ticket.departureDate === selectedDate
      : true;
    const isLocationMatched = searchLocation
      ? ticket.departureCity.toLowerCase().includes(searchLocation) ||
        ticket.arrivalCity.toLowerCase().includes(searchLocation)
      : true;
    return isDateMatched && isLocationMatched;
  });

  const groupedTickets = filteredTickets.reduce((acc, ticket) => {
    if (!ticket.departureDate) return acc;
    const [day, month, year] = ticket.departureDate.split(" ");
    const key = `${month} ${year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const isTicketsEmpty = Object.keys(groupedTickets).length === 0;

  return (
    <>
      <LoggedInNavbar />
      <HeaderOrder
        onFilterDate={handleDateFilter}
        onSearchLocation={handleLocationSearch}
      />
      <div className="container mx-auto mt-10 flex justify-center items-center">
        {isTicketsEmpty ? (
          <div className="text-center mx-auto justify-center items-center">
            <img
              src="./images/Cartshopping.png"
              alt="Tiket Habis"
              className="w-62 h-62"
            />
            <p className="text-black text-lg font-medium mt-2">
              Maaf, Tiket terjual habis!
            </p>
            <p className="text-[#7126B5] text-lg font-medium mt-2">
              Anda belum melakukan pemesanan penerbangan.
            </p>
          </div>
        ) : (
          <div className="w-full">
            {/* Mobile View */}
            <div className="md:hidden">
              {!isDetailView ? (
                <div className="flex flex-col gap-8 justify-center items-center">
                  {Object.keys(groupedTickets).map((monthYear) => (
                    <div key={monthYear} className="mb-10">
                      <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
                      <div className="flex flex-col gap-4">
                        {groupedTickets[monthYear].map((ticket, index) => (
                          <div
                            key={index}
                            onClick={() => handleOrderCardClick(ticket)}
                            className="cursor-pointer"
                          >
                            <OrderCard ticket={ticket} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleBackToList}
                    className="mb-4 text-blue-500 underline text-start"
                  >
                    ← Kembali ke Daftar Pesanan
                  </button>
                  {selectedOrder && (
                    <OrderDetailCard orderDetails={selectedOrder} />
                  )}
                </div>
              )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex gap-8">
              <div className="flex-1">
                {Object.keys(groupedTickets).map((monthYear) => (
                  <div key={monthYear} className="mb-10">
                    <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
                    <div className="flex flex-col gap-4">
                      {groupedTickets[monthYear].map((ticket, index) => (
                        <div
                          key={index}
                          onClick={() => handleOrderCardClick(ticket)}
                          className="cursor-pointer"
                        >
                          <OrderCard ticket={ticket} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                {selectedOrder ? (
                  <OrderDetailCard orderDetails={selectedOrder} />
                ) : (
                  <p className="text-gray-500">
                    Pilih salah satu pesanan untuk melihat detailnya.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
