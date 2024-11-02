"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use next/navigation

const sideItems = [
    {
        icon: "/dashboard1.svg",
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: "/gigs1.svg",
        label: "Gigs/Services",
        href: "/gigs-services",
    },
    {
        icon: "/finances1.svg",
        label: "Finances",
        href: "/finances",
    },
    {
        icon: "/account1.svg",
        label: "Account Application",
        href: "/accounts-applications",
    },
    {
        icon: "/experts1.svg",
        label: "Experts",
        href: "/experts",
    },
    {
        icon: "/buyers1.svg",
        label: "Buyers",
        href: "/buyers",
    },
    {
        icon: "/subs1.svg",
        label: "Subscriptions",
        href: "/subscriptions",
    },
    {
        icon: "/promos1.svg",
        label: "Promotions",
        href: "/promotions",
    },
    {
        icon: "/settings1.svg",
        label: "Settings",
        href: "/settings",  
    },
    {
        icon: "/logout1.svg",
        label: "Logout",
        href: "/sign-in",  
    },
];

const Sidebar = () => {
    const pathname = usePathname(); // Get the current path

    // Split the sideItems array into two parts
    const firstHalf = sideItems.slice(0, 8);
    const secondHalf = sideItems.slice(8);

    return (
        <div className="h-screen">
            <div className="h-[70%]  border-b">
                <ul className=" flex flex-col gap-4 ">
                    {firstHalf.map((item) => {
                        const isActive = pathname === item.href; // Check if the item is active
                        return (
                            <li key={item.label} className={`sidebar-item ${isActive ? 'bg-[#42B883] py-2  rounded-md w-[95%] text-white' : ''}`}>
                                <Link href={item.href} className="flex items-center pl-4 lg:p-2">
                                    <Image src={item.icon} alt={`${item.label} icon`} width={22} height={22} className="mr-4" />
                                    <span className={`font-barlow  hidden lg:block font-medium ${isActive ? 'text-white' : ''}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="h-[30%] pt-3">
                <ul className="flex flex-col gap-4 ">
                    {secondHalf.map((item) => {
                        const isActive = pathname === item.href; // Check if the item is active
                        return (
                            <li key={item.label} className={`sidebar-item ${isActive ? 'bg-[#42B883] py-2  rounded-md w-[95%] text-white' : ''}`}>
                                <Link href={item.href} className="flex items-center pl-4 lg:p-2">
                                    <Image src={item.icon} alt={`${item.label} icon`} width={22} height={22} className="mr-4"/>
                                    <span className={`font-barlow hidden lg:block font-medium ${isActive ? 'text-white' : ''}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
