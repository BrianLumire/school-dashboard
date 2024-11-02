import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";

export default function pagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
        {/*left */}
        <div className="w-[15%] md:w-[10%] lg:w-[16%] xl:w-[15%] border-r">
            <Link href="/" className=" p-4 flex flex-col gap-2 items-center justify-center">
            <Image src="logo1.svg" alt="" width={75} height={60} className=" sm:w-[65px] sm:h-[50]"/>
            <span className="text-[#42B883] font-barlow font-semibold text-sm md:text-base lg:text-xl ">TowGig</span>
            </Link>
            <Sidebar/>
        </div>
        {/*right */}
        <div className=" w-[85%] md:w-[90%] lg:w-[84%] xl:w-[85%] " >
            <Navbar/>
            {children}</div>
    </div>
    
  );
}
