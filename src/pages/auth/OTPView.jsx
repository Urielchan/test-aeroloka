import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { verifyOtp, resendOtp } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearOtpData } from "../../features/otpSlice";

const OTPView = () => {
  const dispatch = useDispatch();
  const { email, otpToken } = useSelector((state) => state.otpState);

  useEffect(() => {
    if (!email || !otpToken) {
      navigate("/register");
      console.log(email, otpToken);
    }
  }, []);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleOTPChange = (index, event) => {
    const value = event.target.value;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOTP = [...watch("otp")];
      newOTP[index] = value;
      setValue("otp", newOTP);

      if (value && index < 5) {
        const nextInput = document.querySelector(
          `input[name="otp.${index + 1}"]`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !watch("otp")[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name="otp.${index - 1}"]`
      );
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const onSubmit = async (data) => {
    const otpValue = data.otp.join("");
    console.log("OTP submitted:", otpValue);
    try {
      const response = await verifyOtp(otpToken, { otp: otpValue });
      toast.success(response.message);
      dispatch(clearOtpData());
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleBack = () => {
    navigate("/register");
  };

  const handleResend = async () => {
    try {
      const response = await resendOtp({ email });
      toast.success(response.message);
      setTimer(60);
      setCanResend(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto justify-center grid items-center h-[95vh]">
      <div className="bg-white rounded-lg p-8">
        <div className="flex space-x-4">
          <button className="-mt-6" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-bold mb-6">Verifikasi OTP</h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Masukkan 6 digit kode yang dikirimkan ke <b>{email}</b>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="flex gap-2 justify-between mb-6 max-w-sm mx-auto">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className={`w-12 h-12 text-center border rounded-lg text-xl font-semibold
                                        ${
                                          errors.otp?.[index]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }
                                        focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none`}
                  {...register(`otp.${index}`, {
                    required: "Required",
                    pattern: {
                      value: /^[0-9]$/,
                      message: "Must be a number",
                    },
                  })}
                  onChange={(e) => handleOTPChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm text-center mb-4">
                Please fill all fields with valid numbers
              </p>
            )}

            <div className="text-center mb-6">
              {!canResend ? (
                <p className="text-gray-600">
                  Kirim ulang OTP dalam {timer} detik
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Kirim ulang OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 
                                    transition-colors duration-200 font-medium focus:outline-none 
                                    focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OTPView;