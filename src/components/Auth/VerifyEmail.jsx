import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "../form/InputForm";
import { forgetPassword } from "../../services/auth.service";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const methods = useForm({
        mode: "onChange",
    });
    const { handleSubmit, formState: {isValid, errors} } = methods;

    const onSubmit = async(data) => {
        try {
            const emailData = {
                email: data.email,
            }

            const response = await forgetPassword(emailData);
            toast.success(response.message)
        } catch (error) {
            toast.error(error.message || 'Email failed')
        }
    };
    return (
        <>
            <div className="">
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
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
                        className="placeholder:text-xs placeholder:lg:text-md"
                    />
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
        </>
    );
};

export default VerifyEmail;