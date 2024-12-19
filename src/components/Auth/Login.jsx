import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputForm from "../form/InputForm";
import { login } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/userSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const methods = useForm({
        mode: "onChange"
    });
    const { handleSubmit, formState: {isValid, errors} } = methods;

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const loginData = {
                identifier: data.identifier,
                password: data.password,
            };
            const response = await login(loginData);
            dispatch(loginUser(response));
            toast.success(`Selamat datang ${response.data.name}`);
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Login Failed");
        }
    };

    return (
        <div className="">
            <FormProvider {...methods}>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="">
                    <InputForm
                        name="identifier"
                        label="Email/No Telepon"
                        placeholder="Contoh: johndoe@gmail.com"
                        validation={{
                            required: "Email atau nomor telepon wajib diisi",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Format email tidak valid",
                            },
                        }}
                        className="placeholder:text-xs placeholder:md:text-md"
                    />

                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="password" className="text-sm">
                            Password
                        </label>
                        <span className="text-[#7126B5] font-medium text-xs lg:text-sm">
                            <a
                                href="#"
                                onClick={() => navigate("/forget-password")}
                            >
                                Lupa Kata Sandi
                            </a>
                        </span>
                    </div>

                    <div className="relative">
                        <InputForm
                            name="password"
                            placeholder="Password"
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
                            className="absolute right-3 top-[12px] text-gray-500 hover:text-gray-700 focus:outline-none"
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
                        Masuk
                    </button>
                </form>
            </FormProvider>

            <div className="text-center text-sm mt-10">
                <p className="">
                    Belum punya akun?
                    <a href="">
                        <span
                            onClick={() => navigate("/register")}
                            className="text-[#7126B5] font-bold"
                        >
                            {" "}
                            Daftar di sini
                        </span>
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;