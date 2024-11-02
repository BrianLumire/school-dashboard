import Image from "next/image";

const Navbar = () => {
    return (
        <div className="border-b pt-6 pb-3 flex justify-between items-center">
            {/*side1 */}
            <div className=" pl-4  flex-col gap-2 hidden md:flex">
               <p className="font-barlow font-medium">WELCOME BACK</p>
               <p className="font-barlow font-medium">Johnstone Johnson</p>
            </div>
            {/*side2 */}
            <div className="flex  pr-6 gap-5  justify-end w-full md:w-auto">
                <div className="p-2 bg-white cursor-pointer rounded-md ring-1 ring-gray-200 ">
                    <Image src="search1.svg" alt="" width={20} height={20}/>
                </div>
                <div className="p-2 bg-white cursor-pointer rounded-md ring-1 ring-gray-200 ">
                    <Image src="notification1.svg" alt="" width={20} height={20}/>
                </div>
                <div className="">
                    <Image src="photo1.svg" alt="" width={40} height={40}/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
