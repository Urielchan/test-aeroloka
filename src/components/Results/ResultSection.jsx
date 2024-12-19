import React, { useState } from "react";
import CardTicket from "../Card/CardTicket";

const ResultsSection = ({ loading, tickets }) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleSelect = (ticketId) => {
    setSelectedTicketId((prevId) => (prevId === ticketId ? null : ticketId));
  };

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${
      minutes > 0 ? `${minutes}m` : ""
    }`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const renderTickets = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 text-lg font-medium mb-5">
            Mencari penerbangan terbaik...
          </p>
          <div className="animate-pulse w-40 h-20 rounded-md flex items-center justify-center">
            <img
              src="/images/Loading.png"
              alt="Loading Icon"
              className="w-40 h-20"
            />
          </div>
        </div>
      );
    }
    if (Array.isArray(tickets) && tickets.length > 0) {
      return tickets.map((ticket) => (
        <CardTicket
          key={ticket.id}
          ticket={{
            ...ticket,
            airline: ticket.airlines.name,
            airport: ticket.airport.name,
            airportTerminal: ticket.airport.terminal,
            flightNumber: ticket.id,
            classType: ticket.class,
            departureCity: ticket.originCity.shortname,
            arrivalCity: ticket.destinationCity.shortname,
            departureTime: ticket.departure.split("T")[1].slice(0, 5),
            arrivalTime: ticket.return.split("T")[1].slice(0, 5),
            departureDate: formatDate(ticket.departure),
            arrivalDate: formatDate(ticket.return),
            duration: formatDuration(ticket.duration),
            price: `Rp ${Number(ticket.price).toLocaleString("id-ID")}`,
            airlineDetail: ticket.information,
          }}
          isOpen={selectedTicketId === ticket.id}
          onSelect={() => handleSelect(ticket.id)}
        />
      ));
    }
    if (Array.isArray(tickets) && tickets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/images/ilustrasi.png"
            alt="Flights are not available"
            className="w-72 h-62"
          />
          <p className="text-gray-600 text-lg font-medium mt-4">
            Tidak ada penerbangan yang tersedia
          </p>
        </div>
      );
    }
  };
  return (
    <section className="md:w-4/5 md:ml-8 mt-8 md:mt-0 flex-col items-center justify-center">
      {renderTickets()}
    </section>
  );
};

export default ResultsSection;
