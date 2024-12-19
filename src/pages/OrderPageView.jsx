import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray, get, set } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormPassenger from "../components/form/FormPassenger";
import FormPemesan from "../components/form/FormPemesan";
import DetailPenerbangan from "../components/Section/DetailPenerbangan";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";

import Stage from "../components/Navbar/Stage";
import SeatSelection from "../components/Section/SeatSection";
import { addBooking } from "../features/bookingSlice";
import { useDispatch } from "react-redux";
import { createBooking } from "../services/transaction.service";
import { getAllSeatByFlightId, getFlightById } from "../services/flight.service";

const OrderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    const fi = parseInt(searchParams.get("fi"),10)
    const adult = searchParams.get("adult")
    const youth = searchParams.get("child") || 0
    const baby = searchParams.get("baby") || 0

    const [data, setData] = useState({});
    const [seats, setSeats] = useState([]);

    const getFlightData = async() => {
        if (!fi) return;
        try {
            const response = await getFlightById(fi)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getSeatByFlightId = async () => {
        try {
            const response = await getAllSeatByFlightId(fi)
            setSeats(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFlightData();
        getSeatByFlightId();
    }, []);

    const [timeLeft, setTimeLeft] = useState(15 * 60);

    useEffect(() => {
        if (timeLeft <= 0) {
            navigate("/");
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, navigate]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(
            mins % 60
        ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const [passengerCount, setPassengerCount] = useState(adult);

    const methods = useForm({
        defaultValues: {
            passengers: Array.from({ length: passengerCount }, () => ({
                firstName: "",
                lastName: "",
                birthDate: "",
                nationality: "",
                ktpNumber: "",
                passportNumber: "",
                passportCountry: "",
                passportExpiry: "",
                selected_seat: "",
            })),
        },
    });

    const { fields } = useFieldArray({
        control: methods.control,
        name: "passengers",
    });

    const onSubmit = (formData) => {
        const unassignedPassengers = formData.passengers.filter(
            (p) => !p.selected_seat
        );

        if (unassignedPassengers.length > 0) {
            toast.error("Please assign seats to all passengers");
            return;
        }

        const { passengers, ...pemesanData } = formData;

        const passengersForApi = passengers.map(({ selected_seat, identification_type, ...passengerData }) => passengerData);

        const creatingBooking = async () => {
            try {
                
                const response = await createBooking({
                    email: pemesanData.email,
                    flightId: parseInt(fi, 10),
                    totalPrice: parseInt(price.replace(/\D/g, ''), 10),
                    passengers: passengersForApi,
                    seats: passengers.map((p) => p.selected_seat),
                });
                const bookingCode = response.data.bookingCode;
                dispatch(addBooking({ 
                    token: response.token, 
                    bookingCode: bookingCode 
                }));
                navigate(`/payment?booking-code=${bookingCode}`);
            } catch (error) {
                toast.error(error.response?.data || error.message);
            }
        };

        creatingBooking();
    };

    const price = new Intl.NumberFormat('id-ID').format((data?.price * adult));

    return (
        <>
            {/* <Navbar /> */}
            <LoggedInNavbar />
            <Stage>
                <div className="text-white bg-red-500 p-2 rounded-lg text-center">
                    Selesaikan dalam {formatTime(timeLeft)}
                </div>
            </Stage>
            <FormProvider {...methods}>
                <div className="max-w-7xl mx-auto p-4">
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="font-bold text-xl mb-4">
                                    Isi Data Pemesan
                                </h2>
                                <FormPemesan />
                            </div>

                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="font-bold text-xl mb-4">
                                    Isi Data Penumpang
                                </h2>
                                {fields.map((field, index) => (
                                    <FormPassenger
                                        key={field.id}
                                        index={index}
                                    />
                                ))}
                            </div>
                            <SeatSelection 
                                seats={seats}
                                airlines={data?.airlines?.name}
                                airline_class={data?.class}
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="font-bold text-xl mb-4">
                                    Detail Penerbangan
                                </h2>
                                <DetailPenerbangan
                                flight_class={data?.class}
                                information={data?.information}
                                departure={data?.departure}
                                    departure_airport={data?.airport?.name}
                                    terminal={data?.airport?.terminal}
                                    returnFlight={data?.return}
                                    return_airport={data?.destinationCity?.fullname}
                                    price={price}
                                    adult={adult}
                                    youth={youth}
                                    baby={baby}
                                    total_price={price}
                                />
                            </div>

                            <div className="w-[95%] mx-auto">
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Lanjut Bayar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </FormProvider>
        </>
    );
};

export default OrderPage;
