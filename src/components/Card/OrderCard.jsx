import React from "react";
import PropTypes from "prop-types";
import PaidButton from "../Button/PaidButton";

const OrderCard = ({ ticket }) => {
  const {
    bookingCode,
    status,
    departureTime,
    departureDate,
    departureCity,
    classType,
    arrivalTime,
    arrivalDate,
    duration,
    arrivalCity,
    price,
  } = ticket;

  const buttonType =
    status === "Issued"
      ? "issued"
      : status.toLowerCase() === "unpaid"
      ? "unpaid"
      : "cancelled";

  return (
    <div className="w-[568px] p-6 border-2 hover:border-[#7126B5BF] rounded-lg flex flex-col justify-between items-center active:border-[#7126B5BF]  bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow">
      <div className="self-start">
        <PaidButton type={buttonType}>{status}</PaidButton>
      </div>

      {/* Route Section */}
      <div className="w-[536px] h-auto border-b-[1px] border-gray-300 p-[16px] flex gap-[16px]">
        <div className="flex flex-1 gap-[8px] items-center">
          {/* Departure Section */}
          <div className="flex items-center">
            <img
              src="/src/assets/icons/Icon_wrapper.svg"
              alt="Toggle Details"
              className="w-6 h-6"
            />
          </div>
          <div className="w-[78px] h-[60px] gap-[2px]">
            <p className="font-bold text-[14px] leading-[20px]">
              {departureCity}
            </p>
            <p className="font-medium text-[12px] leading-[18px] ">
              {departureDate}
            </p>
            <p className="font-medium text-[12px] leading-[18px]">
              {departureTime}
            </p>
          </div>

          {/* Duration Section */}
          <div className="text-sm flex flex-col items-center flex-1">
            <p className="font-medium text-[12px] leading-[18px] text-[#3C3C3C] mb-2">
              {duration}
            </p>
            <div className="w-[233px] h-[1px] bg-gray-300"></div>
          </div>

          {/* Arrival Section */}
          <div className="flex items-center">
            <img
              src="/src/assets/icons/Icon_wrapper.svg"
              alt="Toggle Details"
              className="w-6 h-6"
            />
          </div>
          <div className="w-[78px] h-[60px] gap-[2px]">
            <p className="font-bold text-[14px] leading-[20px] ">
              {arrivalCity}
            </p>
            <p className="font-medium text-[12px] leading-[18px]">
              {arrivalDate}
            </p>
            <p className="font-medium text-[12px] leading-[18px]">
              {arrivalTime}
            </p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-4 border-gray-300 pt-2 pb-2 flex justify-between items-center w-[536px] h-aut gap-[8px]">
        <div className="text-sm">
          <p className="font-bold text-[14px] leading-[20px] ">Booking Code:</p>
          <p className="font-medium text-[14px] leading-[20px]">
            {bookingCode}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-[14px] leading-[20px] ">Class:</p>
          <p className="font-medium text-[14px] leading-[20px]">{classType}</p>
        </div>
        <p className="text-[#7126B5] font-bold text-lg">{`IDR ${price.toLocaleString()}`}</p>
      </div>
    </div>
  );
};

OrderCard.defaultProps = {
  ticket: {
    departureCity: "Not Available",
    departureDate: "Unknown",
    departureTime: "00:00",
    arrivalCity: "Not Available",
    arrivalDate: "Unknown",
    arrivalTime: "00:00",
    duration: "Unknown",
    bookingCode: "No Code",
    classType: "Not Specified",
    price: 0,
  },
};

OrderCard.propTypes = {
  ticket: PropTypes.shape({
    departureCity: PropTypes.string,
    departureDate: PropTypes.string,
    departureTime: PropTypes.string,
    arrivalCity: PropTypes.string,
    arrivalDate: PropTypes.string,
    arrivalTime: PropTypes.string,
    duration: PropTypes.string,
    bookingCode: PropTypes.string,
    classType: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default OrderCard;
