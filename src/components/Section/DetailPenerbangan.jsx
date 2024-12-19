import { div } from "framer-motion/client";
import React from "react";

const DetailPenerbangan = (props) => {
    const {
        flight_class,
        information,
        departure,
        departure_airport,
        terminal,
        returnFlight,
        return_airport,
        total_price,
        price,
        ticket,
        adult,
        youth,
        baby
    } = props;

    const dateForDeparture = new Date(departure);
    const departure_date = dateForDeparture.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const departure_time = dateForDeparture.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });

    const dateForReturn = new Date(returnFlight);
    const return_date = dateForReturn.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const return_time = dateForReturn.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div className="space-y-4">
            <div className="flex justify-between m-0">
                <span className="font-bold">{departure_time}</span>
                <span className="text-purple-600">Keberangkatan</span>
            </div>
            <div className="flex justify-between">
                <div>
                    <p>{departure_date}</p>
                    <p>
                        {departure_airport} - Terminal {terminal}
                    </p>
                </div>
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">Jet Air - {flight_class}</p>
                        <p className="font-bold">JT - 203</p>
                    </div>
                </div>
            </div>

            <div className="border-b py-4">
                <p className="font-bold mb-2">Informasi:</p>
                <ul className="text-gray-600 space-y-1">
                    <li>{information}</li>
                </ul>
            </div>
            <div className="flex justify-between">
                <span className="font-bold">{return_time}</span>
                <span className="text-purple-600">Kedatangan</span>
            </div>
            <div className="flex justify-between">
                <div>
                    <p>{return_date}</p>
                    <p>{return_airport}</p>
                </div>
            </div>

            <div className="border-t pt-4">
                <div className="space-y-2 text-sm">
                    <p className="font-bold">Rincian Harga</p>
                    {ticket ? (
                        <>
                            <div className="flex justify-between">
                                <span>{ticket} Ticket(s)</span>
                                <span>IDR {price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>IDR 0</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <span>{adult} Adults</span>
                                <span>IDR {price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{youth} Youth</span>
                                <span>IDR 0</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{baby} Baby</span>
                                <span>IDR 0</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>IDR 0</span>
                            </div>
                        </>
                    )}
                    <div className="flex justify-between font-bold text-purple-600 pt-2 border-t text-lg">
                        <span>Total</span>
                        <span>IDR {total_price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPenerbangan;
