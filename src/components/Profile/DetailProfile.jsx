import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "../form/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, updateUser } from "../../services/profile.service";
import { toast } from "react-toastify";
import { updateUserState } from "../../features/userSlice";

const DetailProfile = () => {
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.userState.user);
    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    const [profile, setProfile] = useState({});

    const profileData = async () => {
        try {
            if (email) {
                const response = await getUserByEmail(email);
                setProfile(response.data);
                setValue('name', response.data.name);
                setValue('email', response.data.email);
                setValue('phoneNumber', response.data.phoneNumber);
            }
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
    };


    useEffect(() => {
        profileData();
    }, [email]);

    const onSubmit = async (data) => {
        try {
            const response = await updateUser(email, data);
            dispatch(updateUserState(response));
            toast.success(response.message);
        } catch (error) {
            toast.error(error.response?.data || error.message);
        }
    };
    return (
        <>
            <h2 className="text-xl font-bold mb-4 mt-4">Ubah Data Profil</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <div className="bg-purple-500 text-white p-2 rounded-t-2xl">
                            Data Diri
                        </div>
                        <div className="">
                            <div>
                                <InputForm
                                    name="name"
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    validation={{
                                        required: "First name is required",
                                    }}
                                    value={profile.name}
                                />
                            </div>
                            <div>
                                <InputForm
                                    name="phoneNumber"
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    validation={{
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Invalid phone number",
                                        },
                                    }}
                                    value={profile.phoneNumber}
                                />
                            </div>
                            <div>
                                <InputForm
                                    name="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    validation={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid email address",
                                        },
                                    }}
                                    value={profile.email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white rounded-md py-2 px-8 hover:bg-purple-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default DetailProfile;