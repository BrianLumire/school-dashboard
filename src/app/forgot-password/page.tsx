"use client"; 

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { checkEmail, sendOtp } from "@/utils/api"; 

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // State for messages
    const router = useRouter(); // Initialize router

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Check if the email exists
            await checkEmail(email);
            // Send OTP to the user's email
            await sendOtp(email);
            // Redirect to the reset page
            router.push(`/reset?email=${encodeURIComponent(email)}`);
        } catch (error) {
            setMessage("Error: Email does not exist or OTP could not be sent."); // Display error message
            console.error("Error in sending OTP:", error);
        }
    };

    const handleBack = () => {
        router.push("/sign-in"); // Navigate back to the Sign-In page
    };

    return (
        <div className="h-screen w-screen flex">
            {/* Left side with background image */}
            <div className="w-[60%] bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('/background.png')" }}>
                <div className="mt-14 ml-6 cursor-pointer" onClick={handleBack}>
                    <Image src="/arrow.png" alt="Back Arrow" width={30} height={30} />
                </div>
                <div className="flex flex-col items-center mt-40">
                    <Image src="tow.svg" alt="Logo" width={170} height={140} />
                    <p className="font-barlow font-bold text-xl text-white">Towgig</p>
                </div>
            </div>
            {/* Right side for the forgot password form */}
            <div className="pl-6 flex flex-col md:pl-0 md:w-[40%] flex items-center justify-center">
                {/* Back arrow for small screens */}
                <div className="bg-[#42B883] mb-10 rounded-md   md:hidden cursor-pointer" onClick={handleBack}>
                    <Image src="/arrow.png" alt="Back Arrow" width={30} height={30} />
                </div>
                <div className="p-8 w-full max-w-sm">
                    <h2 className="text-xl text-[#0052B4] mb-8 font-barlow font-semibold">
                        Reset your Password
                    </h2>
                    <p className="font-barlow text-base mb-14">
                        Enter your email address and we will send a confirmation email to reset your password
                    </p>
                    <form id="forgot-password" onSubmit={handleSubmit}>
                        <div className="mb-32 relative">
                            <label className="block text-[#0052B4] font-barlow font-semibold mb-3" htmlFor="email">
                                Enter your email
                            </label>
                            <Image
                                src="Mail.svg"
                                alt="Email Icon"
                                className="absolute left-3 bottom-3"
                                width={20}
                                height={20}
                            />
                            <input
                                className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500"
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="bg-[#42B883] w-full text-white py-2 rounded-lg hover:bg-[#5bbd91]"
                            type="submit"
                        >
                            Request Code
                        </button>
                    </form>
                    {message && <p className="mt-4 text-red-500">{message}</p>} {/* Display message */}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
