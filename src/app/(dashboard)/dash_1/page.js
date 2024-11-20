"use client";
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import Custom_div from '@/components/custom_div';
import ChartPopup from '@/components/chart_popup';
import ChartOptionsPopup from '@/components/chart_options_popup';

function CustomDash() {
  const [showChartPopup, setShowChartPopup] = useState(false);
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null); // Track which div is selected
  const [selectedChartType, setSelectedChartType] = useState(''); // Track selected chart type
  const [chartConfigs, setChartConfigs] = useState({}); // Store chart configurations for each div

  // Load chart configurations from localforage on initial render
  useEffect(() => {
    async function loadConfigs() {
      const savedConfigs = await localforage.getItem('chartConfigs');
      if (savedConfigs) {
        setChartConfigs(savedConfigs);
      }
    }
    loadConfigs();
  }, []);

  // Save chart configurations to localforage whenever they change
  useEffect(() => {
    localforage.setItem('chartConfigs', chartConfigs);
  }, [chartConfigs]);

  const openChartPopup = (divIndex) => {
    setSelectedDiv(divIndex);
    setShowChartPopup(true);
  };

  const closeChartPopup = () => {
    setShowChartPopup(false);
  };

  const openOptionsPopup = (chartType) => {
    setSelectedChartType(chartType); // Set selected chart type
    setShowOptionsPopup(true);
    closeChartPopup();
  };

  const closeOptionsPopup = () => {
    setShowOptionsPopup(false);
  };

  const applyChartConfig = (divIndex, config) => {
    // Update the chart configuration for the specific div
    setChartConfigs((prevConfigs) => ({
      ...prevConfigs,
      [divIndex]: config,
    }));
    closeOptionsPopup();
  };

  const removeChart = (divIndex) => {
    setChartConfigs((prevConfigs) => {
      const newConfigs = { ...prevConfigs };
      delete newConfigs[divIndex];
      return newConfigs;
    });
  };

  return (
    <div className="flex flex-wrap gap-2 relative">
      {[0, 1, 2, 3].map((divIndex) => (
        <Custom_div
          key={divIndex}
          openChartPopup={() => openChartPopup(divIndex)}
          divIndex={divIndex}
          chartConfig={chartConfigs[divIndex]} // Pass the specific configuration to each div
          removeChart={() => removeChart(divIndex)} // Pass remove chart function to each div
        />
      ))}

      {showChartPopup && <ChartPopup closePopup={closeChartPopup} openOptionsPopup={openOptionsPopup} />}
      {showOptionsPopup && (
        <ChartOptionsPopup
          closePopup={closeOptionsPopup}
          selectedDiv={selectedDiv}
          applyChartConfig={(config) => applyChartConfig(selectedDiv, config)}
          chartType={selectedChartType} // Pass the selected chart type
        />
      )}
    </div>
  );
}

export default CustomDash;
