import React from "react";
import { useFormContext } from "react-hook-form";

const SelectForm = ({
    label,
    name,
    defaultValue,
    list,
    validation = {},
    placeholder,
    className,
}) => {
    const {
        register,
        formState: { errors },
        watch
    } = useFormContext();

    // Get nested error using the name path
    const getNestedError = (errors, path) => {
        const keys = path.split(".");
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
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <select
                id={name}
                className={`p-2 border rounded-md ${
                    error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500 mb-4"
                } ${className}`}
                defaultValue={defaultValue}
                {...register(name, validation)}
                aria-invalid={error ? "true" : "false"}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {list.map((item) => (
                    <option
                        key={typeof item === "object" ? item.value : item}
                        value={typeof item === "object" ? item.value : item}
                    >
                        {typeof item === "object" ? item.label : item}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-500 mt-1 mb-4" role="alert">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default SelectForm;
