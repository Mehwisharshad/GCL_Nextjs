"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import Preloader from "@/components/Preloader";

const ExamplePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMeters, setSelectedMeters] = useState([]); // Array of selected meters
  const [rates, setRates] = useState(""); // State for rates input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form submission
  const [loading, setLoading] = useState(false);

  const meters = [
    { id: "U_2", name: "Ball Mills-4" },
    { id: "U_3", name: "Masjid" },
    { id: "U_4", name: "Glaze Line-2" },
    { id: "U_5", name: "Auto Packing" },
    { id: "U_6", name: "DPM-2" },
    { id: "U_7", name: "Colony D.B" },
    { id: "U_8", name: "Light D.B # 02" },
    { id: "U_9", name: "Kiln Blower Fan - (R.V.E)" },
    { id: "U_10", name: "Belt 300 Feeding" },
    { id: "U_11", name: "Belt 200 Feeding" },
    { id: "U_12", name: "Glaze Line-1" },
    { id: "U_13", name: "Prekiln" },
    { id: "U_14", name: "5 Layer Dryer" },
    { id: "U_15", name: "Ball Mills-2" },
    { id: "U_16", name: "Laboratory" },
    { id: "U_17", name: "Air Compressors-1" },
    { id: "U_18", name: "Light D.B # 01" },
    { id: "U_19", name: "Kiln Loading Machine" },
    { id: "U_20", name: "Glaze Ball Mill" },
    { id: "U_21", name: "Press PH4300" },
    { id: "U_22", name: "Lighting (Plant)" },
    { id: "U_23", name: "Ball Mills-1" },
    { id: "U_24", name: "Transformer 1" },
    { id: "U_25", name: "Transformer 2" },
    { id: "U_26", name: "Solar 1" },
    { id: "U_27", name: "Solar 2" },
  ];

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleMeterSelect = (meterId) => {
    if (selectedMeters.includes(meterId)) {
      // Deselect if already selected
      setSelectedMeters(selectedMeters.filter((id) => id !== meterId));
    } else {
      // Add new selection
      setSelectedMeters([...selectedMeters, meterId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all meters
      setSelectedMeters(meters.map((meter) => meter.id));
    } else {
      // Clear selection
      setSelectedMeters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || selectedMeters.length === 0 || !rates) {
      alert("Please fill out all fields including rates.");
      return;
    }

    const suffix = "ACTIVE_ENERGY_IMPORT_KWH"; // Fixed suffix
    const apiUrl = `http://localhost/Test_Api/energycostreport.php`;

    setLoading(true); // Show the preloader immediately

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          meterIds: selectedMeters,
          rates: rates,
          suffixes: suffix,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();
      console.log("Data fetched successfully:", data);

      setFetchedData(data); // Update the fetched data
      setIsSubmitted(true); // Transition to the report view
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setLoading(false); // Ensure preloader is hidden
    }
  };

  if (loading) {
    return <Preloader />; // Always show the preloader while loading is true
  }
  const handleExport = () => {
    // Prepare data for Excel
    const headers = [
      "No",
      "Sources",
      "KWH",
      "Unit Price (PKR)",
      "Total Price (PKR)",
    ];
    const rows = fetchedData.map((item, index) => {
      const totalPrice = item.consumption * rates;
      return [
        index + 1,
        meters.find((meter) => meter.id === item.meterId)?.name,
        item.consumption.toFixed(2),
        rates,
        totalPrice.toFixed(2),
      ];
    });
    const dataForExcel = [headers, ...rows]; // Add headers to the rows

    // Convert to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(dataForExcel);

    // Add custom styles to the header
    const headerCellStyle = {
      fill: { fgColor: { rgb: "0070C0" } }, // Blue background
      font: { color: { rgb: "FFFFFF" }, bold: true, sz: 14 }, // White bold text, size 14
      alignment: { horizontal: "center", vertical: "center" }, // Center align
    };

    // Apply styles to header cells
    headers.forEach((_, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex }); // Row 0, Column colIndex
      if (!worksheet[cellAddress]) worksheet[cellAddress] = {}; // Ensure cell exists
      worksheet[cellAddress].s = headerCellStyle;
    });

    // Set column widths for better readability
    worksheet["!cols"] = [
      { wpx: 50 }, // Width for "No"
      { wpx: 150 }, // Width for "Sources"
      { wpx: 100 }, // Width for "KWH"
      { wpx: 120 }, // Width for "Unit Price (PKR)"
      { wpx: 150 }, // Width for "Total Price (PKR)"
    ];

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Billing Report");

    // Export to Excel file
    XLSX.writeFile(workbook, "Energy_Cost_Report.xlsx");
  };

  if (isSubmitted && fetchedData) {
    const grandTotal = fetchedData.reduce(
      (acc, item) => acc + item.consumption * rates,
      0
    );

    return (
      <div
        className="shadow-lg rounded-[8px] p-6 w-full h-full bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
        style={{ minHeight: "85vh" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-700">
            Energy Cost Report
          </h1>
          <div className="flex space-x-4">
            {/* Back Button with Icon */}
            <button
              onClick={() => setIsSubmitted(false)} // Logic to go back
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr></hr>

        <div className="mb-8">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Invoice To:
              </h2>
              <p className="text-gray-600">Ghani Ceramics Limited</p>
              <p className="text-gray-600">
                M3 Industrial City, Service Rd, Faisalabad, Pakistan
              </p>
              <p className="text-gray-600">Phone: 0308 5789166</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-gray-700">
                Jahaann Technologies
              </h2>
              <p className="text-gray-600">
                22-C Block, G.E.C.H.S, Phase 3 Peco Road, Lahore, Pakistan
              </p>
              <p className="text-gray-600">Phone: +924235949261</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-green-500 to-red-500 my-4"></div>
        <br></br>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            {/* Export Button */}
            <button
              onClick={handleExport} // Attach the export function here
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Export
            </button>

            {/* Start Date and End Date */}
            <div className="text-right">
              <h2 className="text-lg font-bold text-blue-700">
                Billing Report
              </h2>
              <div className="text-gray-600 mt-2">
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-center text-sm font-semibold text-gray-700">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Sources</th>
                <th className="border border-gray-300 px-4 py-2">KWH</th>
                <th className="border border-gray-300 px-4 py-2">
                  Unit Price (PKR)
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Price (PKR)
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((item, index) => {
                const totalPrice = item.consumption * rates;
                return (
                  <tr
                    key={index}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="border border-gray-300 px-4 py-2  bg-[#3989c6] text-white font-semibold">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      {meters.find((meter) => meter.id === item.meterId)?.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      {item.consumption.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      {rates}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-[#3989c6] text-white font-semibold">
                      {totalPrice.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Grand Total Row */}
        <div className="mt-4">
          {/* <hr className="border-t-2 border-blue-500 mb-2" /> */}
          <div className="flex justify-between items-center text-lg font-bold text-blue-600">
            <span>GRAND TOTAL</span>
            <span>
              {fetchedData
                .reduce((acc, item) => acc + item.consumption * rates, 0)
                .toFixed(2)}{" "}
              PKR
            </span>
          </div>
        </div>

        <div className="mt-8   text-sm text-gray-600">
          <p className="border-l-4 border-[#3a8ac5] mb-2">
            Thank you very much for doing business with us. We look forward to
            working with you again.
          </p>
          <div className="flex justify-between mt-4 border-t pt-4 bg-[#e6e4e4] p-4">
            <p>
              Generated on: {new Date().toLocaleTimeString()}, Date:{" "}
              {new Date().toISOString().split("T")[0]}
            </p>
            <p>Generated By: Jahaann Technologies </p>
            <p> Email: info@jahaann.com</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="energy-cost-report"
      className="shadow-lg rounded-[8px] p-6 w-full h-full bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
      style={{ minHeight: "85vh" }}
    >
      <h1 className="text-lg font-bold text-gray-700 mb-4">
        Energy Cost Report
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[13px] font-bold text-[#626469] ">
            Title
          </label>
          <input
            type="text"
            // placeholder="Energy Cost Report"
            value="Energy Cost Report"
            // onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
            style={{
              boxShadow: "rgba(98, 100, 105, 0.2) 0px 1px 3px 0px inset", // Box shadow
            }}
          />
        </div>
        {/* Sources Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469] mb-2">
            Sources
          </label>
          <button
            type="button"
            onClick={toggleModal}
            className="w-full p-2 border rounded-md text-gray-700"
            style={{
              background: "linear-gradient(#f7f7f7, #e6e6e6)",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset",
              borderColor: "#9fa0a4",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(#fff, #ededed)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(#f7f7f7, #e6e6e6)")
            }
          >
            {selectedMeters.length > 0
              ? `Selected: ${selectedMeters.length} Meters`
              : "Select Sources"}
          </button>

          {/* Conditionally show the input field below */}
          {selectedMeters.length > 0 && (
            <div className="mt-2">
              <label className="block text-[13px] font-bold text-[#626469]">
                Selected Sources
              </label>
              <input
                type="text"
                value={selectedMeters
                  .map((id) => meters.find((meter) => meter.id === id)?.name)
                  .join(", ")}
                readOnly
                className="w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
              />
            </div>
          )}
        </div>

        {/* Rates Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469]">
            Rates
          </label>
          <input
            type="number"
            step="0.01" // Allows decimal values
            value={rates}
            onChange={(e) => setRates(e.target.value)}
            className="w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
            placeholder="0.0"
            required
          />
        </div>

        {/* Start Date Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469]">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={(e) => e.target.showPicker()} // Open calendar on focus
            className="w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
            max={endDate} // Restrict start date to be before or equal to the end date
          />
        </div>

        {/* End Date Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469]">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={(e) => e.target.showPicker()} // Open calendar on focus
            className="w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
            min={startDate} // Restrict end date to be after or equal to the start date
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-[240px] h-[35px] block font-sans text-[16px] font-bold text-white no-underline uppercase text-center  
             pt-[4px] mt-[10px] ml-[5px] relative cursor-pointer border-none rounded-[5px] 
             bg-[#1784d9] bg-gradient-to-b from-[#1784d9] to-[#389de9] 
             shadow-[inset_0px_1px_0px_#2ab7ec,_0px_5px_0px_#497a78,_0px_10px_5px_#999]"
          >
            {loading ? "Loading..." : "SUBMIT"}
          </button>
        </div>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-4">
            <div className="bg-blue-200 p-2 rounded-t-lg">
              <h2 className="text-sm font-bold text-gray-700">
                Select Sources
              </h2>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto">
              {/* Select All Checkbox */}
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedMeters.length === meters.length}
                    onChange={handleSelectAll}
                    className="form-checkbox rounded"
                  />
                  <span className="ml-2">Select All</span>
                </label>
              </div>
              {/* Individual Meter Checkboxes */}
              {meters.map((meter) => (
                <div key={meter.id} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMeters.includes(meter.id)}
                      onChange={() => handleMeterSelect(meter.id)}
                      className="form-checkbox rounded"
                    />
                    <span className="ml-2">{meter.name}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end p-2 space-x-4">
              {/* OK Button */}
              <button
                onClick={() => {
                  // Add your logic for the OK button
                  toggleModal(); // Optionally close the modal
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                OK
              </button>

              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamplePage;
