"use client"; 

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/utils/api";

const Create = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const urlParams = new URLSearchParams(window.location.search);
    const otp = urlParams.get('otp');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await resetPassword(newPassword, otp); 
            setMessage("Your password has been reset successfully.");
            router.push("/sign-in");
        } catch (error) {
            setError("Error resetting password. Please try again.");
            console.error("Error resetting password:", error);
        }
    };

    const handleBack = () => {
        router.push("/reset"); 
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
                        Create a New Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-[#0052B4] font-barlow font-medium mb-5" htmlFor="new-password">
                                Enter New Password
                            </label>
                            <input
                                className="w-full px-4 py-2 border mb-5 border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500"
                                type="password"
                                id="new-password"
                                placeholder="Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-20">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500"
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="bg-[#42B883] w-full text-white py-2 rounded-lg hover:bg-[#5bbd91]"
                            type="submit"
                        >
                            Save Password
                        </button>
                    </form>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>} {/* Display error message */}
                </div>
            </div>
        </div>
    );
};

export default Create;
