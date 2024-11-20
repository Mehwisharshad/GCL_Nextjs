import React from 'react'
import Div from "@/components/Div";
import Link from "next/link";

function DashboardPage() {
  return (
    <main className='p-1'>
    

      <div className="flex flex-wrap gap-3">
        <Div title={"Today"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%]"}></Div>
        <Div title={"Weekly"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%]"}></Div>
        <Div title={"Monthly"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%]"}></Div>
        <Div title={"Yearly"} height={'130px'} length={"lg:w-[23.6%] xl:w-[23.6%] mr-0"}></Div>
        <Div title={"Live Energy Consumption"} height={'300px'} length={"lg:w-[31.9%] xl:w-[32.4%]"}></Div>
        <Div title={"Live Power"} height={'300px'} length={"lg:w-[63.8%] xl:w-[63.8%]"}></Div>
        <Div title={"Pie Chart"} height={'300px'}></Div>
        <Div title={"Donut Chart"} height={'300px'} length={"lg:w-[50.3%] xl:w-[50.3%]"}></Div>
      </div>
    </main>
  )
}

export default DashboardPage

