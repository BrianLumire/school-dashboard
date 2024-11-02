"use client"; 

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { checkOtp } from "@/utils/api"; 

const Reset = () => {
    const [pin, setPin] = useState(["", "", "", ""]); // State for the 4-digit PIN
    const [message, setMessage] = useState(""); // State for messages
    const [error, setError] = useState("");
    const router = useRouter();
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        const newPin = [...pin];
        newPin[index] = value;

        // Move focus to the next input if a digit is entered
        if (value && index < 3) {
            inputsRef.current[index + 1].focus();
        }
        // Move focus back if the input is empty and not the first input
        if (!value && index > 0) {
            inputsRef.current[index - 1].focus();
        }

        setPin(newPin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Join the PIN array into a single string
        const pinCode = pin.join("");

        try {
            // Validate the OTP using the API
            await checkOtp(pinCode);
            // Proceed to the Create page if the OTP is valid
            router.push(`/create?otp=${pinCode}`);
        } catch (error) {
            setError("Invalid OTP. Please try again."); // Display error message
            console.error("Error validating OTP:", error);
        }
    };

    const handleBack = () => {
        router.push("/forgot-password"); // Navigate back to the Forgot Password page
    };

    return (
        <div className="h-screen w-screen flex">
            <div className="w-[60%] bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('/background.png')" }}>
                <div className="mt-14 ml-6 cursor-pointer" onClick={handleBack}>
                    <Image src="/arrow.png" alt="Back Arrow" width={30} height={30} />
                </div>
                <div className="flex flex-col items-center mt-40">
                    <Image src="tow.svg" alt="Logo" width={170} height={140} />
                    <p className="font-barlow font-bold text-xl text-white">Towgig</p>
                </div>
            </div>
            <div className="pl-6 flex flex-col md:pl-0 md:w-[40%] flex items-center justify-center">
                {/* Back arrow for small screens */}
                <div className="bg-[#42B883] mb-10 rounded-md   md:hidden cursor-pointer" onClick={handleBack}>
                    <Image src="/arrow.png" alt="Back Arrow" width={30} height={30} />
                </div>
                <div className="p-8 w-full max-w-sm">
                    <h2 className="text-xl text-[#0052B4] mb-8 font-barlow font-semibold">
                        Reset Your Password
                    </h2>
                    <p className="font-barlow mb-16">Enter the 4-PIN code sent to your email</p>
                    <p className="font-medium text-lg mb-5 font-barlow text-[#0052B4] ">Enter the code</p>
                    <form id="reset" onSubmit={handleSubmit}>
                        <div className="flex justify-between mb-4">
                            {pin.map((digit, index) => (
                                <input
                                    key={index}
                                    className="w-1/4 px-3 py-3 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500 text-center"
                                    type="text"
                                    maxLength={1}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onFocus={(e) => e.target.select()} // Select input text on focus
                                />
                            ))}
                        </div>
                        {error && <p className="mt-4 text-red-500">{error}</p>} {/* Display message */}
                        <div className="flex gap-1 mb-20">
                            <span className="font-barlow font-thin">Didn’t get the code? </span>
                            <span className="font-barlow text-[#42B883] font-thin">Resend code in 60</span>
                        </div>
                        <button
                            className="bg-[#42B883] w-full text-white py-2 rounded-lg hover:bg-[#5bbd91]"
                            type="submit"
                        >
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reset;
