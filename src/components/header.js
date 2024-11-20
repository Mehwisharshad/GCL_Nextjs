"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faGear,
  faProjectDiagram,
  faArrowTrendUp,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleTabClick }) => {
  const pathname = usePathname();

  return (
    <header className="bg-[#004785] text-[#efefef] mx-0 my-2 mt-0 flex text-[14px]">
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Home")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg ${
            pathname === "/dashboard" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faDashboard} /> DASHBOARD
        </p>
      </Link>
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Custom")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg ${
            pathname === "/dash_1" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faDashboard} /> CUSTOM DASHBOARD
        </p>
      </Link>
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Diagram")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg ${
            pathname === "/sld" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faProjectDiagram} /> DIAGRAM
        </p>
      </Link>
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Trends")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg ${
            pathname === "/custom-trend" || pathname === "/comparison-trends"
              ? "bg-white text-black"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faArrowTrendUp} /> TRENDS
        </p>
      </Link>
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Alarms")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg ${
            pathname === "/alarms" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBell} /> ALARMS
        </p>
      </Link>
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Reports")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg ${
            pathname === "/energy_cost" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBell} />REPORTS
        </p>
      </Link>
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Setting")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg ${
            pathname === "/add_roles" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faGear} /> SETTING
        </p>
      </Link>
    </header>
  );
};

export default Header;
