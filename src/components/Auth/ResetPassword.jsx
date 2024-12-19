import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "../form/InputForm";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const methods = useForm({
        mode: "onChange",
    });
    const { handleSubmit, formState: {isValid, errors} } = methods;

    const onSubmit = async (data) => {
        try {
            const resetData = {
                password: data.password,
                confirm_password: data.confirm_password,
            };
            const response = await resetPassword(token, resetData);
            toast.success(response.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Reset password failed");
        }
    };
    return (
        <div className="">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <InputForm
                            name="password"
                            label="Buat Password"
                            placeholder="Buat Password"
                            type={showPassword ? "text" : "password"}
                            validation={{
                                required: "Password wajib diisi",
                                minLength: {
                                    value: 6,
                                    message: "Password minimal 6 karakter",
                                },
                            }}
                            className="placeholder:text-xs placeholder:lg:text-md"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[36px] text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? (
                                <FaRegEyeSlash className="h-5 w-5" />
                            ) : (
                                <FaRegEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <InputForm
                            name="confirm_password"
                            label="konfirmasi Password"
                            placeholder="Ulangi Password"
                            type={showPassword ? "text" : "password"}
                            validation={{
                                required: "Password wajib diisi",
                                minLength: {
                                    value: 6,
                                    message: "Password minimal 6 karakter",
                                },
                            }}
                            className="placeholder:text-xs placeholder:lg:text-md"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[36px] text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? (
                                <FaRegEyeSlash className="h-5 w-5" />
                            ) : (
                                <FaRegEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={!isValid || Object.keys(errors).length > 0}
                        className={`w-full py-3 px-4 rounded-lg transition-colors ${
                            isValid && Object.keys(errors).length === 0
                                ? "bg-[#7126B5] text-white hover:bg-[#531d85]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Kirim
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};

export default ResetPassword;