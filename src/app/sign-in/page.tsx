"use client"; 

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { loginUser } from "@/utils/api";

const SignInPage = () => {
    const [isPasswordStep, setIsPasswordStep] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); 
    const router = useRouter(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPasswordStep) {
            setIsPasswordStep(true); 
        } else {
            try {
                const data = await loginUser(email, password);
                console.log("Login successful:", data);
               
                router.push("/dashboard");
            } catch (error) {
                setMessage("Invalid credentials. Please try again."); 
                console.error("Login failed:", error);
            }
        }
    };

    const handleForgotPassword = () => {
        router.push("/forgot-password"); 
    };

    const handleBack = () => {
        if (isPasswordStep) {
            setIsPasswordStep(false); 
            setPassword(""); 
        } else {
            router.push("/sign-in"); 
        }
    };

    return (
        <div className="h-screen w-screen flex">
            {/* Left Side */}
            <div className="w-[60%] bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('/background.png')" }}>
                {isPasswordStep && (
                    <div className="mt-10 ml-8 cursor-pointer" onClick={handleBack}>
                        <Image src="/arrow.png" alt="Back Arrow" width={30} height={30} />
                    </div>
                )}
                <div className="flex flex-col items-center mt-56">
                    <Image src="tow.svg" alt="Logo" width={170} height={140} />
                    <p className="font-barlow font-bold text-xl text-white">Towgig</p>
                </div>
            </div>
            {/* Right Side */}
            <div className="pl-6 flex flex-col md:pl-0 md:w-[40%] items-center justify-center">
                {/* Back arrow for small screens */}
                {isPasswordStep && (
                    <div className="bg-[#42B883] mb-10 rounded-md md:hidden cursor-pointer" onClick={handleBack}>
                        <Image src="/arrow.png" alt="Back Arrow" width={30} height={30} />
                    </div>
                )}
                <div className="p-8 w-full max-w-sm">
                    <h2 className="text-xl text-[#0052B4] mb-8 font-barlow font-semibold">
                        Sign in to your account
                    </h2>
                    <form id="login" onSubmit={handleSubmit}>
                        <div className="mb-4 relative">
                            <label className="block text-[#0052B4] font-barlow font-semibold mb-3" htmlFor={isPasswordStep ? "password" : "email"}>
                                {isPasswordStep ? "Enter your password" : "Enter your email"}
                            </label>
                            <Image
                                src={isPasswordStep ? "Vector.svg" : "Mail.svg"}
                                alt={isPasswordStep ? "Password Icon" : "Email Icon"}
                                className="absolute left-3 bottom-3"
                                width={20}
                                height={20}
                            />
                            <input
                                className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-500"
                                type={isPasswordStep ? "password" : "email"}
                                id={isPasswordStep ? "password" : "email"}
                                placeholder={isPasswordStep ? "Password" : "Email"}
                                value={isPasswordStep ? password : email}
                                onChange={(e) => isPasswordStep ? setPassword(e.target.value) : setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-40">
                            {isPasswordStep && (
                                <div className="mt-4 text-right">
                                    <a 
                                        onClick={handleForgotPassword} 
                                        className="text-[#42B883] cursor-pointer font-barlow hover:underline"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            )}
                        </div>
                        <button
                            className="bg-[#42B883] w-full text-white py-2 font-barlow rounded-lg hover:bg-[#5bbd91]"
                            type="submit"
                        >
                            {isPasswordStep ? "Sign In" : "Continue"}
                        </button>
                    </form>
                    {message && <p className="mt-4 text-red-500">{message}</p>} {/* Display message */}
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
