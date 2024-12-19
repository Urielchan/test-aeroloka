import React, { useEffect, useState } from "react";
import ButtonScroll from "../Button/ButtonScroll";
import ButtonChange from "../Button/ButtonChange";
import { useLocation } from "react-router-dom";
import { addDays, format, parseISO } from "date-fns";

const NavigationDates = ({ onDateClick }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [searchDetails, setSearchDetails] = useState("");
  const [dates, setDates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const from = params.get("from");
    const to = params.get("to");
    const departureDate = params.get("departureDate");
    const adult = parseInt(params.get("adult")) || 0;
    const child = parseInt(params.get("child")) || 0;
    const infant = parseInt(params.get("infant")) || 0;
    const seatClass = params.get("seatClass");

    const passengerCount = adult + child + infant;

    setSearchDetails(
      `${from} > ${to} - ${passengerCount} Penumpang - ${seatClass}`
    );

    let departureDateObj;
    if (departureDate) {
      departureDateObj = parseISO(departureDate);
    } else {
      departureDateObj = new Date();
    }
    const generatedDates = getNextDates(departureDateObj, 60);
    setDates(generatedDates);

    const departureIndex = generatedDates.findIndex(
      (dateObj) => dateObj.dateObj.getTime() === departureDateObj.getTime()
    );
    if (departureIndex !== -1) {
      setActiveIndex(departureIndex);
    }
  }, [location]);

  const getNextDates = (startingDate = new Date(), count = 30) => {
    const dates = [];
    for (let i = 0; i < count; i++) {
      const currentDate = addDays(startingDate, i);
      dates.push({
        day: format(currentDate, "EEEE"),
        date: format(currentDate, "dd/MM/yyyy"),
        dateObj: currentDate,
      });
    }
    return dates;
  };

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(0, prev - 7));
  };

  const scrollRight = () => {
    const lastIndex = dates.length - 1;
    const newIndex = startIndex + 7;
    if (newIndex >= dates.length) {
      const nextStartDate = addDays(dates[lastIndex].dateObj, 1);
      const newDates = getNextDates(nextStartDate, 30);
      setDates([...dates, ...newDates]);
    }
    setStartIndex((prev) => Math.min(dates.length - 7, prev + 7));
  };

  const handleDateClick = (index, date) => {
    setActiveIndex(index);
    onDateClick(date);
  };

  return (
    <div className="w-full md:w-4/5 mx-auto px-4 my-4 ">
      <div className="flex items-center justify-between gap-8 ">
        <div className="w-[1650px] h-[50px] bg-[#A06ECE] rounded-xl p-3 flex items-center hover:bg-[#7126B5] text-white shadow-lg mb-3 md:mb-0">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </a>
          <div className="flex-1 font-medium truncate ml-4 text-white">
            {searchDetails}
          </div>
        </div>
        <div className="md:w-1/2">
          <ButtonChange />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 gap-2 w-full">
        <ButtonScroll
          direction="left"
          onClick={scrollLeft}
          disabled={startIndex === 0}
        />

        <div className="flex gap-8 overflow-x-auto scrollbar-hide items-center justify-center w-full sm:overflow-hidden">
          {dates.slice(startIndex, startIndex + 7).map((item, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(startIndex + index, item.date)}
              className={`flex flex-col items-center justify-center w-[120px] h-[60px] rounded-[8px] cursor-pointer transition-all ${
                activeIndex === startIndex + index
                  ? "bg-[#7126B5] text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-[#7126B5] hover:text-white"
              }`}
              style={{
                minWidth: "120px",
                maxWidth: "120px",
                minHeight: "60px",
                maxHeight: "60px",
              }}
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-sm">{item.day}</span>
                <span className="text-xs">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        <ButtonScroll
          direction="right"
          onClick={scrollRight}
          disabled={startIndex + 7 >= dates.length}
        />
      </div>
    </div>
  );
};

export default NavigationDates;
