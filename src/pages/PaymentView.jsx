import { useEffect, useState } from "react";
import Stage from "../components/Navbar/Stage";
import DetailPenerbangan from "../components/Section/DetailPenerbangan";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import { useSearchParams } from "react-router-dom";
import { getBookingByCode } from "../services/transaction.service";

const PaymentView = () => {
    const [searchParams] = useSearchParams();
    const bookingCode = searchParams.get("booking-code");

    const [data, setData] = useState({});

    const insertSnapScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute(
                "data-client-key",
                import.meta.env.VITE_CLIENT_MIDTRANS
            );
            script.onload = () => resolve();
            document.body.appendChild(script);
        });
    };

    const pay = async () => {
        try {
            const response = await getBookingByCode(bookingCode);
            const { snap_token } = response.data;
            setData(response.data);
            window.snap.embed(snap_token, {
                embedId: "snap-container",
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    alert("payment success!");
                    console.log(result);
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    alert("wating your payment!");
                    console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    alert("payment failed!");
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        insertSnapScript();
        pay();
    }, []);

    const passangerCount = data && data.passengers ? data.passengers.length : 0;

    const price = new Intl.NumberFormat('id-ID').format((data?.flight?.price * passangerCount));

    const totalPrice = new Intl.NumberFormat('id-ID').format(data?.totalPrice);
    console.log(data);

    return (
        <div>
            <LoggedInNavbar />
            <Stage stage2={""} />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div
                            className="w-[70vw] mx-auto lg:w-[40vw] lg:h-[60vh] m-2"
                            id="snap-container"
                        ></div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6">
                            <h2 className="font-bold text-xl mb-4">
                                Booking Code: <span className="text-purple-600">{bookingCode}</span>
                            </h2>
                            <DetailPenerbangan
                                flight_class={data?.flight?.class}
                                information={data?.flight?.information}
                                departure={data?.flight?.departure}
                                departure_airport={data?.flight?.airport.name}
                                terminal={data?.flight?.airport.terminal}
                                returnFlight={data?.flight?.return}
                                return_airport={data?.flight?.destinationCity.fullname}
                                ticket = {passangerCount}
                                price= {price}
                                total_price={totalPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentView;
