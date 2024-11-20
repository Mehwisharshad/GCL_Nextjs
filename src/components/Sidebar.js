"use client";

import React from "react";
import DashboardMenu from "@/components/dashboard_options";
import DiagramMenu from "@/components/diagram_options";
import TrendMenu from "@/components/trend_options";
import AlarmMenu from "@/components/alarms_options";
import SettingMenu from "@/components/setting_options";
import Custom_dashMenu from "@/components/cutom_dashboard";
import ReportsMenu from "@/components/reports_options";

const Sidebar = ({ activeTab, handleTabClick }) => {
  const renderMenu = () => {
    if (activeTab === "Home") return <DashboardMenu />;
    if (activeTab === "Diagram") return <DiagramMenu />;
    if (activeTab === "Trends") return <TrendMenu />;
    if (activeTab === "Alarms") return <AlarmMenu />;
    if (activeTab === "Setting") return <SettingMenu />;
    if (activeTab === "Custom") return <Custom_dashMenu />;
    if (activeTab === "Reports") return <ReportsMenu />;

    return null;
  };

  return (
    <aside className="flex-shrink-0 w-[256px] bg-[#f2f2f2] text-[#808080] h-[85vh] m-3 rounded-[7px] border-t-[5px] border-t-[#1f5897] relative border-2 border-[grey]">
      <div className="p-2 border-b-[1px] border-[#808080]">
        <p className="text-[13px] py-1 text-black">Dashboards Section</p>
      </div>
      {renderMenu ()} {/* Render menu dynamically */}
      <img
        src={"./Jahaanns.png"}
        alt="User Image"
        className="w-full h-[auto] rounded-full absolute m-[auto] bottom-0 opacity-80"
      />
    </aside>
  );
};

export default Sidebar;
