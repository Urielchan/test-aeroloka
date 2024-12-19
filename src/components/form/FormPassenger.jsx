import React, { useState } from "react";
import countries from "../../assets/data/countries";
import SelectForm from "./SelectForm";
import InputForm from "../form/InputForm";
import { useFormContext, useWatch } from "react-hook-form";
import ToggleSwitch from "../Button/SwitchButton";

const FormPassenger = ({ index }) => {
    const { control, setValue } = useFormContext();

    const hasLastName = useWatch({
        control,
        name: `passengers.${index}.hasLastName`,
        defaultValue: false,
    });

    const handleToggle = (newValue) => {
        setValue(`passengers.${index}.hasLastName`, newValue);
        if (!newValue) {
            setValue(`passengers.${index}.lastName`, "");
        }
    };

    const identificationType = useWatch({
        control,
        name: `passengers.${index}.identification_type`,
    });

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4 bg-black text-white px-4 py-2 rounded-t-xl">
                Data Diri Penumpang {index + 1} - Adult
            </h3>

            <InputForm
                name={`passengers.${index}.firstName`}
                label="First Name"
                placeholder="Enter your first name"
                validation={{
                    required: "First name is required",
                }}
            />

            <div className="flex justify-between mb-4">
                <span className="font-bold">Do you have family name?</span>
                <ToggleSwitch isOn={hasLastName} onToggle={handleToggle} />
            </div>

            {hasLastName && (
                <InputForm
                    name={`passengers.${index}.lastName`}
                    label="Family Name"
                    placeholder="Enter your family name"
                    validation={{
                        required: hasLastName ? "Last name is required" : false,
                    }}
                />
            )}

            <InputForm
                name={`passengers.${index}.birthDate`}
                label="Birth Date"
                type="date"
                validation={{
                    required: "Birth date is required",
                    max: {
                        value: new Date().toISOString().split("T")[0],
                        message: "Invalid birth date",
                    },
                }}
            />

            <SelectForm
                key={index}
                name={`passengers.${index}.nationality`}
                label="Nationality"
                placeholder="Select your Nationality"
                validation={{
                    required: "Nationality is required",
                }}
                list={countries}
            />

            <SelectForm
                name={`passengers.${index}.identification_type`}
                label="Identification Type"
                placeholder="Select your identification type"
                validation={{
                    required: "Identification type is required",
                }}
                list={[
                    { label: "KTP", value: "ktp" },
                    { label: "Passport", value: "passportNumber" },
                ]}
            />

            {identificationType === "ktp" && (
                <InputForm
                    name={`passengers.${index}.ktpNumber`}
                    label="KTP Number"
                    placeholder="Enter your KTP Number"
                    validation={{
                        required: "KTP Number is required",
                        maxLength: {
                            value: 16,
                            message: "KTP Number cannot exceed 16 characters",
                        },
                    }}
                />
            )}

            {identificationType === "passportNumber" && (
                <>
                    <InputForm
                        name={`passengers.${index}.passportNumber`}
                        label="Passport"
                        placeholder="Enter your Passport"
                        validation={{
                            required: "Passport is required",
                            maxLength: {
                                value: 10,
                                message: "Passport cannot exceed 10 characters",
                            },
                        }}
                    />
                    <SelectForm
                        name={`passengers.${index}.passportCountry`}
                        label="Negara Penerbit"
                        placeholder="Select your passport country"
                        validation={{
                            required: "Negara penerbit is required",
                        }}
                        list={countries}
                    />
                    <InputForm
                        name={`passengers.${index}.passportExpiry`}
                        label="Berlaku Sampai"
                        type="date"
                        validation={{
                            required: "Berlaku Sampai is required",
                            min: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Invalid Berlaku Sampai",
                            },
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default FormPassenger;
