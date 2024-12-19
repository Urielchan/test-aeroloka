import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

const SeatSelection = (props) => {
    const {seats, airlines, airline_class } = props;

    const bookedSeats = seats
    .filter(seat => seat.status === 'booked' || seat.version === 2)
    .map(seat => seat.seatNumber);

    let airlineClass = (airline_class || '').trim().toUpperCase();
    let seatRows;
    if (airlineClass === 'FIRST CLASS') {
        seatRows = 2;
    } else if (airlineClass === 'BUSINESS') {
        seatRows = 6;
    } else if (airlineClass === 'PREMIUM ECONOMY') {
        seatRows = 8;
    } else {
        seatRows = 12;
    }
    console.log(`airlineClass: "${airlineClass}"`);
    
    const methods = useFormContext();
    const { update } = useFieldArray({
        control: methods.control,
        name: "passengers",
    });

    const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

    // Generate seat layout data
    const rows = Array.from({ length: seatRows }, (_, i) => i + 1);
    const leftColumns = ["A", "B", "C"];
    const rightColumns = ["D", "E", "F"];

    // Predefined unavailable seats
    const unavailableSeats = new Set(bookedSeats);

    // Special seats (P1, P2)
    const specialSeats = {};

    // Get all selected seats across passengers
    const getAllSelectedSeats = () => {
        return methods
            .getValues("passengers")
            .map((p) => p.selected_seat)
            .filter(Boolean);
    };

    const handleSeatSelect = (seatId) => {
        const allSelectedSeats = getAllSelectedSeats();

        // If seat is already selected by current passenger, unselect it
        if (
            methods.getValues(
                `passengers.${currentPassengerIndex}.selected_seat`
            ) === seatId
        ) {
            update(currentPassengerIndex, {
                ...methods.getValues(`passengers.${currentPassengerIndex}`),
                selected_seat: "",
            });
            return;
        }

        // If seat is already taken by another passenger
        if (allSelectedSeats.includes(seatId)) {
            toast.error("This seat is already taken by another passenger");
            return;
        }

        // Assign seat to current passenger
        update(currentPassengerIndex, {
            ...methods.getValues(`passengers.${currentPassengerIndex}`),
            selected_seat: seatId,
        });
    };

    const getSeatColor = (seatId) => {
        if (unavailableSeats.has(seatId)) return "bg-gray-300";
        if (specialSeats[seatId]) return "bg-purple-600";

        // Get current passenger's seat
        const currentPassengerSeat = methods.getValues(
            `passengers.${currentPassengerIndex}.selected_seat`
        );

        // Check if seat is selected by any passenger
        const allSelectedSeats = getAllSelectedSeats();
        if (seatId === currentPassengerSeat) return "bg-purple-600";
        if (allSelectedSeats.includes(seatId)) return "bg-red-500";

        return "bg-green-400 hover:bg-green-500";
    };

    return (
        <div className="w-full max-w-2xl border border-gray-300 rounded-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Pilih Kursi</h2>
                <div className="bg-green-400 text-white p-4 rounded-lg mb-8 text-center">
                    <h3 className="text-xl font-semibold">
                        {airlineClass} - {airlines}
                    </h3>
                </div>

                {/* Passenger Selection for Seat Assignment */}
                <div className="bg-white rounded-lg border p-6 mb-4">
                    <h2 className="font-bold text-xl text-center mb-4">
                        Select Passenger for Seat Assignment
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {methods
                            .getValues("passengers")
                            .map((passenger, index) => {
                                const seat =
                                    passenger.selected_seat || "No seat";
                                return (
                                    <button
                                        key={`passenger-${index}-${seat}`} // Tambahkan seat ke key untuk memastikan keunikan
                                        type="button"
                                        onClick={() =>
                                            setCurrentPassengerIndex(index)
                                        }
                                        className={`p-2 rounded ${
                                            currentPassengerIndex === index
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200"
                                        }`}
                                    >
                                        Passenger {index + 1} ({seat})
                                    </button>
                                );
                            })}
                    </div>
                </div>

                {/* Seat legend */}
                <div className="flex gap-4 mb-4 justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-400 rounded"></div>
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-600 rounded"></div>
                        <span>Your Selection</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded"></div>
                        <span>Taken by Other Passenger</span>
                    </div>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="grid gap-2">
                        {/* Column headers */}
                        <div className="grid grid-cols-7 gap-2">
                            <div className="col-span-3 grid grid-cols-3">
                                {leftColumns.map((col) => (
                                    <div
                                        key={col}
                                        className="text-center font-semibold"
                                    >
                                        {col}
                                    </div>
                                ))}
                            </div>
                            <div /> {/* Middle spacer */}
                            <div className="col-span-3 grid grid-cols-3">
                                {rightColumns.map((col) => (
                                    <div
                                        key={col}
                                        className="text-center font-semibold"
                                    >
                                        {col}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Seat grid */}
                        {rows.map((row) => (
                            <div key={row} className="grid grid-cols-7 gap-2">
                                {/* Left seats */}
                                <div className="col-span-3 grid grid-cols-3 gap-2">
                                    {leftColumns.map((col) => {
                                        const seatId = `${row}${col}`;
                                        return (
                                            <button
                                                key={seatId}
                                                type="button"
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(
                                                    seatId
                                                )}`}
                                                onClick={() =>
                                                    handleSeatSelect(seatId)
                                                }
                                                disabled={
                                                    unavailableSeats.has(
                                                        seatId
                                                    ) || specialSeats[seatId]
                                                }
                                            >
                                                {unavailableSeats.has(seatId)
                                                    ? "X"
                                                    : specialSeats[seatId] ||
                                                      seatId}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Row number */}
                                <div className="flex items-center justify-center font-semibold">
                                    {row}
                                </div>

                                {/* Right seats */}
                                <div className="col-span-3 grid grid-cols-3 gap-2">
                                    {rightColumns.map((col) => {
                                        const seatId = `${row}${col}`;
                                        return (
                                            <button
                                                key={seatId}
                                                type="button"
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(
                                                    seatId
                                                )}`}
                                                onClick={() =>
                                                    handleSeatSelect(seatId)
                                                }
                                                disabled={
                                                    unavailableSeats.has(
                                                        seatId
                                                    ) || specialSeats[seatId]
                                                }
                                            >
                                                {unavailableSeats.has(seatId)
                                                    ? "X"
                                                    : specialSeats[seatId] ||
                                                      seatId}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
