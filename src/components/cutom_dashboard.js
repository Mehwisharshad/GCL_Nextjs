"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Custom_dashMenu = () => {

    const pathname = usePathname();
    return (
        <div>

            <nav className={`mt-4 text-gray-600 text-lg slide-from-right`}>


                <Link href="/dash_1" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/dash_1" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                    1.Dashboard 1
                </Link>
                <Link href="dash_2" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/dash_2" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                    2.Dashboard 2
                </Link>
                <Link href="#" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "#" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                    3.Dashboard 3
                </Link>
                <Link href="#" className="block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded">
                    4.Dashboard 4
                </Link>
                <Link href="#" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "#" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                    5.Dashboard 5
                </Link>


            </nav>
        </div>
    );
};

export default Custom_dashMenu;
