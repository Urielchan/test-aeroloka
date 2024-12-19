import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import FlightModal from "../Modals/FlightModal";
import PassengerModal from "../Modals/PassengerModal";
import SeatClassModal from "../Modals/SeatClassModal";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getFlights } from "../../services/home.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchFlight = ({ selectedFlight, isDatepickerVisible }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userState);

  const [isFlightFromModalOpen, setIsFlightFromModalOpen] = useState(false);
  const [isFlightToModalOpen, setIsFlightToModalOpen] = useState(false);
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
  const [isSeatClassModalOpen, setIsSeatClassModalOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [isReturnEnabled, setIsReturnEnabled] = useState(false);
  const [seatClass, setSeatClass] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();

  const [passengers, setPassengers] = useState({
    Dewasa: 0,
    Anak: 0,
    Bayi: 0,
  });
  const totalPassengers = passengers.Dewasa + passengers.Anak + passengers.Bayi;

  const openModal = (modal) => {
    if (modal === "from") {
      setIsFlightFromModalOpen(true);
    } else if (modal === "to") {
      setIsFlightToModalOpen(true);
    } else if (modal === "passenger") {
      setIsPassengerModalOpen(true);
    } else if (modal === "seatclass") {
      setIsSeatClassModalOpen(true);
    }
  };

  const handleSwitch = (e) => {
    e.preventDefault();
    setFrom(to);
    setTo(from);
  };

  const handleSelectLocation = (location, type) => {
    if (type === "from") {
      setFrom(location);
      setValue("from", location);
      setIsFlightFromModalOpen(false);
    } else if (type === "to") {
      setTo(location);
      setValue("to", location);
      setIsFlightToModalOpen(false);
    }
  };

  const handleToggle = () => {
    setIsReturnEnabled((prev) => !prev);
    if (!isReturnEnabled) {
      setReturnDate(null);
    }
  };

  const handlePassengerChange = (updatedPassengers) => {
    setPassengers(updatedPassengers);
    setIsPassengerModalOpen(false);
    setValue("passengers", updatedPassengers);
  };

  const handleSeatClassChange = (selectedClass) => {
    setSeatClass(selectedClass.label);
    setIsSeatClassModalOpen(false);
    setValue("seatClass", selectedClass.label);
  };

  const handleSearch = async (data) => {
    if (!user) {
      toast.error("Anda harus login atau register terlebih dahulu!");
      return;
    }
    setIsButtonClicked(true);

    try {
      await searchFlights(data);
    } catch (error) {
      toast.error("Penerbangan tidak ditemukan!");
    } finally {
      setIsButtonClicked(false);
    }
  };

  const formatDate = (date, forDisplay = false) => {
    if (!date) return "";
    if (forDisplay) {
      return moment(date).format("DD MMMM YYYY");
    } else {
      return moment(date).format("YYYY-MM-DD");
    }
  };

  useEffect(() => {
    if (selectedFlight) {
      const depDate = new Date(selectedFlight.departure);
      const retDate = selectedFlight.return
        ? new Date(selectedFlight.return)
        : null;

      setFrom(selectedFlight.originCity.fullnmae);
      setTo(selectedFlight.destinationCity.fullnmae);
      setDepartureDate(depDate);
      setReturnDate(retDate);
      setIsReturnEnabled(!!selectedFlight.return);

      setValue("from", selectedFlight.originCity.fullname);
      setValue("to", selectedFlight.destinationCity.fullname);
      setValue("departureDate", depDate);
      setValue("returnDate", retDate);
    }
  }, [selectedFlight, setValue]);

  const searchFlights = async (data) => {
    try {
      const isoDepartureDate = departureDate ? formatDate(departureDate) : null;
      const isoReturnDate = returnDate ? formatDate(returnDate) : null;

      const response = await getFlights({
        from: data.from,
        to: data.to,
        departureDateStart: isoDepartureDate,
        returnDateStart: isoReturnDate,
        adultPassengers: passengers.Dewasa,
        childPassengers: passengers.Anak,
        infantPassengers: passengers.Bayi,
        seatClass: seatClass,
      });

      const queryParams = new URLSearchParams({
        from: data.from,
        to: data.to,
        departureDate: isoDepartureDate,
        returnDate: isoReturnDate || "",
        adult: data.passengers.Dewasa,
        child: data.passengers.Anak,
        infant: data.passengers.Bayi,
        seatClass: data.seatClass,
      });

      if (response && response.data && response.data.length > 0) {
        toast.success("Penerbangan ditemukan!");
        navigate(`/detail-ticket?${queryParams.toString()}`, {
          state: { flightData: response.data },
        });
      } else {
        toast.info("Tidak ada penerbangan yang tersedia!");
        navigate(`/detail-ticket?${queryParams.toString()}`, {
          state: { flightData: [] },
        });
      }
    } catch (error) {
      toast.error(error.resposnse?.data);
      navigate(`/detail-ticket?${queryParams.toString()}`, {
        state: { flightData: [] },
      });
    }
  };

  return (
    <div>
      <FlightModal
        isOpen={isFlightFromModalOpen}
        onClose={() => setIsFlightFromModalOpen(false)}
        onSelectFlight={(location) => handleSelectLocation(location, "from")}
        label="From"
        fromLocation={to}
      />

      <FlightModal
        isOpen={isFlightToModalOpen}
        onClose={() => setIsFlightToModalOpen(false)}
        onSelectFlight={(location) => handleSelectLocation(location, "to")}
        label="to"
        toLocation={to}
      />

      <PassengerModal
        isOpen={isPassengerModalOpen}
        onClose={() => setIsPassengerModalOpen(false)}
        onPassengerChange={handlePassengerChange}
        passengers={passengers}
      />

      <SeatClassModal
        isOpen={isSeatClassModalOpen}
        onClose={() => setIsSeatClassModalOpen(false)}
        onSeatClassChange={handleSeatClassChange}
      />

      <div className="absolute top-56 right-1 left-1 z-10 lg:top-80 lg:mt-3">
        <div className="p-4 mx-8 bg-white rounded-xl shadow-xl border border-gray-300 md:mx-56">
          <h2 className="text-xl font-bold py-3 lg:px-1">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-[#7126B5]"> Tiketku!</span>
          </h2>
          <form action="" onSubmit={handleSubmit(handleSearch)}>
            <div className="grid grid-cols-1 gap-4 w-full items-center mb-5 lg:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-center">
                <img
                  src="/icons/fi_flight-takeoff.svg"
                  alt="Take Off Icon"
                  className="mr-2"
                />
                <p className="block mr-5 text-sm text-[#8A8A8A]">From</p>
                <div className="flex flex-col w-full">
                  <input
                    id="fromFlight"
                    placeholder="Cari kota asal"
                    value={from}
                    onClick={() => openModal("from")}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base"
                    {...register("from", { required: "Kota asal wajib diisi" })}
                  />
                  {errors.from && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.from?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button className="" onClick={handleSwitch}>
                  <img src="/icons/fi_return.svg" alt="Return Icon" />
                </button>
              </div>

              <div className="flex items-center">
                <img
                  src="/icons/fi_flight-takeoff.svg"
                  alt="Take Off Icon"
                  className="mr-2"
                />
                <p className="block mr-5 text-sm text-[#8A8A8A]">To</p>
                <div className="flex flex-col w-full">
                  <input
                    id="toFlight"
                    placeholder="Cari kota tujuan"
                    value={to}
                    onClick={() => openModal("to")}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base"
                    {...register("to", { required: "Kota tujuan wajib diisi" })}
                  />
                  {errors.to && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.to?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 w-full mb-5 lg:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
                <div className="flex items-center mr-6 mb-3 mt-3 md:mt-0">
                  <img
                    src="/icons/fi_date.svg"
                    alt="Date Icon"
                    className="mr-2 ml-1 w-5"
                  />
                  <p className="block text-sm text-[#8A8A8A]">Date</p>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col mr-3">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Departure
                    </label>
                    <Controller
                      control={control}
                      name="departureDate"
                      rules={{ required: "Tanggal berangkat wajib diisi" }}
                      render={({ field }) => (
                        <div>
                          {isDatepickerVisible ? (
                            <Datepicker
                              {...field}
                              primaryColor={"purple"}
                              showShortcuts={true}
                              asSingle={true}
                              value={departureDate}
                              onChange={(date) => {
                                setDepartureDate(date);
                                field.onChange(date);
                              }}
                              displayFormat="DD MMMM YYYY"
                              placeholder="Pilih tanggal"
                              inputClassName="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 placeholder:text-[#7126B5] lg:text-base"
                            />
                          ) : (
                            <input
                              {...field}
                              readOnly
                              value={
                                departureDate
                                  ? formatDate(departureDate, true)
                                  : ""
                              }
                              className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 placeholder:text-[#7126B5] lg:text-base"
                            />
                          )}
                        </div>
                      )}
                    />
                    {errors.departureDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.departureDate?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mr-3">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Return
                    </label>
                    <Controller
                      control={control}
                      name="returnDate"
                      rules={{
                        required: isReturnEnabled
                          ? "Tanggal pulang wajib diisi"
                          : true,
                      }}
                      render={({ field }) => (
                        <div>
                          {isDatepickerVisible ? (
                            <Datepicker
                              {...field}
                              primaryColor={"purple"}
                              showShortcuts={true}
                              asSingle={true}
                              value={returnDate}
                              onChange={(date) => {
                                if (isReturnEnabled) {
                                  setReturnDate(date);
                                  field.onChange(date);
                                }
                              }}
                              displayFormat="DD MMMM YYYY"
                              placeholder="Pilih tanggal"
                              disabled={!isReturnEnabled}
                              inputClassName={`w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base ${
                                isReturnEnabled
                                  ? "placeholder:text-[#7126B5]"
                                  : "placeholder:text-gray-400"
                              }`}
                            />
                          ) : (
                            <input
                              {...field}
                              readOnly
                              value={
                                returnDate ? formatDate(returnDate, true) : ""
                              }
                              className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 placeholder:text-[#7126B5] lg:text-base"
                            />
                          )}
                        </div>
                      )}
                    />
                    {errors.returnDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.returnDate?.message}
                      </p>
                    )}
                  </div>
                  <div className="absolute top-[48%] right-14 flex items-center justify-center ml-2 md:right-[50%] lg:top-[46%]">
                    <div
                      className={`w-[40px] h-[24px] bg-[#4B1979] rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-xl ${
                        isReturnEnabled ? "bg-[#4B1979]" : "bg-gray-300"
                      }`}
                      onClick={handleToggle}
                      aria-checked={isReturnEnabled}
                    >
                      <div
                        className={`w-[20px] h-[20px] bg-white rounded-full shadow-xl transition-all duration-300 ease-in-out transform ${
                          isReturnEnabled
                            ? "translate-x-[16px] translate-y-0.5"
                            : "translate-x-[4px] translate-y-0.5"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
                <div className="flex items-center mr-6 mb-3 mt-3 md:mt-0">
                  <img
                    src="/icons/fi_airlane-seat.svg"
                    alt="Airlane Seat Icon"
                    className="mr-2 w-7 lg:ml-6"
                  />
                  <p className="block text-sm text-[#8A8A8A]">To</p>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col mr-3">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Passengers
                    </label>
                    <Controller
                      control={control}
                      name="passengers"
                      rules={{
                        validate: (value) =>
                          totalPassengers > 0
                            ? true
                            : "Harap input jumlah penumpang",
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="passengerCount"
                          value={
                            totalPassengers > 0
                              ? `${totalPassengers} Penumpang`
                              : "0 Penumpang"
                          }
                          onClick={() => openModal("passenger")}
                          readOnly
                          className={`w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base ${
                            totalPassengers > 0 ? "text-black" : "text-gray-400"
                          }`}
                        />
                      )}
                    />
                    {errors.passengers && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.passengers?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Seat Class
                    </label>
                    <Controller
                      control={control}
                      name="seatClass"
                      rules={{ required: "Harap pilih seat class" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="seatClass"
                          value={seatClass || ""}
                          onClick={() => openModal("seatclass")}
                          placeholder="Pilih seat class"
                          readOnly
                          className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base"
                        />
                      )}
                    />
                    {errors.seatClass && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.seatClass?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full h-[48px] rounded-xl text-sm font-bold text-center text-white 
                ${isButtonClicked ? "bg-[#7126B5]" : "bg-[#A06ECE]"} 
                hover:bg-[#7126B5] hover:shadow-lg md:text-lg transition-colors duration-300`}
            >
              Cari Penerbangan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
