import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import HeaderTicket from "../components/Header/HeaderTicket";
import NavigationDates from "../components/Navbar/NavigationDates";
import FilterButton from "../components/Filter/FilterButton";
import FilterSection from "../components/Filter/FilterSection";
import ResultsSection from "../components/Results/ResultSection";
import { useLocation } from "react-router-dom";
import { getFlights } from "../services/home.service";

const DetailTicket = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Termurah");
  const [activeDate, setActiveDate] = useState(null);
  const { user } = useSelector((state) => state.userState);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departureDateStart = searchParams.get("departureDate");
  const returnDateStart = searchParams.get("returnDate");
  const seatClass = searchParams.get("seatClass");
  const adultPassengers = parseInt(searchParams.get("adult")) || 0;
  const childPassengers = parseInt(searchParams.get("child")) || 0;
  const infantPassengers = parseInt(searchParams.get("infant")) || 0;

  const applyFilter = () => {
    const filterFunctions = {
      "Harga - Termurah": (a, b) =>
        parseInt(a.price.replace(/\D/g, "")) -
        parseInt(b.price.replace(/\D/g, "")),
      "Durasi - Terpendek": (a, b) => {
        const durationToMinutes = (d) =>
          parseInt(d.split("h")[0]) * 60 +
          parseInt(d.split("h")[1]?.split("m")[0] || 0);
        return durationToMinutes(a.duration) - durationToMinutes(b.duration);
      },
      "Keberangkatan - Paling Awal": (a, b) =>
        a.departureTime.localeCompare(b.departureTime),
      "Keberangkatan - Paling Akhir": (a, b) =>
        b.departureTime.localeCompare(a.departureTime),
      "Kedatangan - Paling Awal": (a, b) =>
        a.arrivalTime.localeCompare(b.arrivalTime),
      "Kedatangan - Paling Akhir": (a, b) =>
        b.arrivalTime.localeCompare(a.arrivalTime),
    };

    let updatedTickets = [...tickets];

    if (activeDate) {
      updatedTickets = updatedTickets.filter(
        (ticket) => ticket.departureDate === activeDate
      );
    }

    if (filterFunctions[activeFilter]) {
      updatedTickets.sort(filterFunctions[activeFilter]);
    }

    setFilteredTickets(updatedTickets);
  };

  useEffect(() => {
    if (tickets.length > 0) {
      applyFilter();
    }
  }, [activeFilter, activeDate, tickets]);

  const handleDateFilter = (date) => {
    setActiveDate(date);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await getFlights({
          from,
          to,
          departureDateStart,
          returnDateStart,
          adultPassengers,
          childPassengers,
          infantPassengers,
          seatClass,
        });

        if (response.data && Array.isArray(response.data)) {
          setTickets(response.data);
          setFilteredTickets(response.data);
        } else {
          toast.info("Tidak ada penerbangan yang tersedia!");
          setTickets([]);
          setFilteredTickets([]);
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
        toast.error("Gagal mengambil data penerbangan.");
        setTickets([]);
        setFilteredTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [
    from,
    to,
    departureDateStart,
    returnDateStart,
    adultPassengers,
    childPassengers,
    infantPassengers,
    seatClass,
  ]);

  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />}

      <div className="pt-[100px] gap-2">
        <div className="w-full h-[231px] bg-white shadow-md ">
          <HeaderTicket />
          <NavigationDates onDateClick={handleDateFilter} tickets={tickets} />
        </div>
        <FilterButton
          tickets={tickets}
          activeDate={activeDate}
          setFilteredData={setFilteredTickets}
          onFilterChange={handleFilterChange}
          selectedFilter={activeFilter}
        />
        <main className="w-full md:w-4/5 mx-auto flex flex-col md:flex-row justify-center">
          {!loading && filteredTickets.length > 0 && <FilterSection />}
          <ResultsSection loading={loading} tickets={filteredTickets} />
        </main>
      </div>
    </>
  );
};

export default DetailTicket;
