import React from "react";
import DetailSection from "../Results/DetailSection";
import ButtonSelect from "../Button/ButtonSelect";

const CardTicket = ({ ticket, isOpen, onSelect }) => {
  const {
    airline,
    airport,
    airportTerminal,
    flightNumber,
    classType,
    departureTime,
    departureCity,
    arrivalTime,
    arrivalCity,
    duration,
    departureDate,
    arrivalDate,
    price,
    airlineDetail,
  } = ticket;

  return (
    <div
      className="cardTicket w-full flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg hover:border-purple-500 transition-shadow mb-4 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/images/Thumbnail.png"
              alt="Airline Logo"
              className="w-6 h-6"
            />
            <p className="text-sm font-medium">{`${airline} - ${classType}`}</p>
          </div>
          <img
            src="/src/assets/icons/Suffix.svg"
            alt="Toggle Details"
            className="w-6 h-6 cursor-pointer hover:shadow-xl"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          />
        </div>

        <div className="flex gap-x-12">
          <div className="flex-1 flex gap-x-8">
            <div className="flex-1 flex items-center gap-x-4 ml-[30px]">
              <div>
                <p className="text-xl font-bold">{departureTime}</p>
                <p className="text-sm text-gray-500">{departureCity}</p>
              </div>
              <div className="text-sm text-gray-500 flex flex-col items-center flex-1">
                <p className="mb-2">{duration}</p>
                <div className="w-[233px] h-[1px] bg-gray-300"></div>
                <span className="mt-2">Direct</span>
              </div>

              <div>
                <p className="text-xl font-bold">{arrivalTime}</p>
                <p className="text-sm text-gray-500">{arrivalCity}</p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="/src/assets/icons/icon_baggage-delay.svg"
                  alt="Toggle Details"
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-lg font-bold text-purple-600">{price}</p>
            <ButtonSelect />
          </div>
        </div>
      </div>

      {isOpen && (
        <DetailSection
          airline={airline}
          airport={airport}
          airportTerminal={airportTerminal}
          flightNumber={flightNumber}
          classType={classType}
          departureTime={departureTime}
          departureDate={departureDate}
          departureCity={departureCity}
          arrivalTime={arrivalTime}
          arrivalDate={arrivalDate}
          arrivalCity={arrivalCity}
          airlineDetail={airlineDetail}
        />
      )}
    </div>
  );
};

export default CardTicket;
