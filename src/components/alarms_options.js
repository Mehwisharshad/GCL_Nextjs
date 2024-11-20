"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const AlarmMenu = () => {

    const pathname = usePathname();
    return (
        <div>

            <nav className={`mt-4 text-black text-lg slide-from-right`}>


                <Link href="/alarms" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/custom-trend" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                1. All Alarms
                </Link>
                <Link href="#" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/comparison-trends" ? 'bg-[#B4D5F8] text-black mx-2' : ''}`}>
                2. Recent Alarms
                
                </Link>


            </nav>
        </div>
    );
};

export default AlarmMenu;

