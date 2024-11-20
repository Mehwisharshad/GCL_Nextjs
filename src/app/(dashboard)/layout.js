"use client";

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation"; // Import usePathname
import TopHeader from "@/components/topheader";
import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const [loading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

  const pathname = usePathname(); // Get the current pathname

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update activeTab state
  };

  useEffect(() => {
    setActiveTab((prevTab) => {
      if (pathname === "/sld") return "Diagram";
      else if (pathname === "/custom-trend") return "Trends";
      else if (pathname === "/comparison-trends") return "Trends";
      else if (pathname === "/add_roles") return "Setting";
      else if (pathname === "/dash_1") return "Custom";
      else if (pathname === "/alarms") return "Alarms";
      else if (pathname === "/energy_cost") return "Reports";
      return prevTab;
    });
  }, [pathname]);

  return (
    <div className={`${inter.className} flex flex-col min-h-screen`}>
      {/* Header Section */}
      <TopHeader />
      <Header handleTabClick={handleTabClick} />

      {/* Main Content Section */}
      <div className="flex">
        <Sidebar activeTab={activeTab} handleTabClick={handleTabClick} /> {/* Pass activeTab and handleTabClick */}

        <main
          className="flex-1 overflow-x-hidden overflow-y-auto m-3 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: 'url("./bglogo.png")' }}
        >
          {children}
        </main>
      </div>

      {/* Footer Section */}
      {/* <footer className="bg-gray-100 text-center py-4 border-t">
        © 2024 Your Company. All rights reserved.
      </footer> */}
    </div>
  );
}
