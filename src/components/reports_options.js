'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const ReportsMenu = () => {

    const pathname = usePathname();
    return (
        <div>

            <nav className={`mt-4 text-black text-lg slide-from-right`}>


                <Link href="/energy_cost" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/energy_cost" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                Energy Cost Report
                </Link>
                <Link href="#" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "#" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                Energy Usage Report
                
                </Link>


            </nav>
        </div>
    );
};

export default ReportsMenu;

