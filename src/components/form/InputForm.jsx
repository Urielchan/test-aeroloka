import React from "react";
import { useFormContext } from "react-hook-form";

const InputForm = ({ type = "text", name, label, validation, placeholder, className, value = "" }) => {
    const { register, formState: { errors } } = useFormContext();
    
    // Get nested error using the name path
    const getNestedError = (errors, path) => {
        const keys = path.split('.');
        let currentError = errors;
        
        for (const key of keys) {
            if (currentError && currentError[key]) {
                currentError = currentError[key];
            } else {
                return null;
            }
        }
        
        return currentError;
    };

    const error = getNestedError(errors, name);

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                className={`p-2 border rounded-md ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 mb-4'
                } ${className}`}
                {...register(name, validation)}
                aria-invalid={error ? "true" : "false"}
            />
            {error && (
                <p className="text-sm text-red-500 mt-1 mb-4" role="alert">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default InputForm;