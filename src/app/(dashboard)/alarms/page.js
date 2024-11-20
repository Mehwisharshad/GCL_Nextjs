"use client"
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '@/styles/custom_page.module.css';

export default function Page() {
  const [selectedMeters, setSelectedMeters] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  const handleMeterChange = (e) => {
    const value = e.target.value;
    setSelectedMeters(prevState => {
      if (prevState.includes(value)) {
        return prevState.filter(meter => meter !== value);
      } else {
        return [...prevState, value];
      }
    });
    
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleParameterChange = (e) => setSelectedParameter(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const generateChart = async () => {
    if (selectedMeters.length === 0 || !selectedParameter || !startDate || !endDate) {
      alert('Please fill all the fields!');
      return;
    }

    const fetchedData = await fetchData(selectedMeters, selectedParameter, startDate, endDate);

    setChartData({
      labels: fetchedData.labels,
      datasets: fetchedData.datasets,
    });
  };

  const fetchData = async (meters, parameter, startDate, endDate) => {
    // Here, generate mock data for each selected meter.
    // Each dataset (meter) will have its own line and color.
    const data = meters.map((meter, index) => ({
      label: `${parameter} for ${meter}`,
      data: [100 + index * 10, 120 + index * 10, 110 + index * 10],  // Example data; replace with actual dynamic data based on the date range
      borderColor: `hsl(${(index * 60) % 360}, 100%, 50%)`,  // Different color for each meter
      fill: false,
      tension: 0.1, // Smooth lines
    }));

    return {
      labels: ['2024-11-01', '2024-11-02', '2024-11-03'],  // Example dates; replace with actual dates
      datasets: data,
    };
  };

  // The chart is only created/updated when `chartData` is set, which happens after generating the chart
  useEffect(() => {
    if (chartData && chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy(); // Destroy the existing chart instance to avoid overlap
      }

      chartRef.current.chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: selectedParameter,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom', // Position the legend below the chart
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  // Custom tooltips for each meter
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${selectedParameter}`;
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.topSection}></div>
        <div className={styles.content}>
          <h1 style={{ color: 'grey', fontWeight: 'bold', fontSize:'18px' }}>CEMERIC PLANT TRENDS</h1>
        </div>

        <div className={styles.card_medium}>
          <div className={styles.content}>
            <div className={styles.form_Row}>
              <h1 style={{ color: 'grey', fontWeight: 'bold', fontSize: '15px', marginLeft: '-10px', marginTop: '5px'}}>Select details:</h1>
              <div className={styles.meterDropdown}>
                <div
                  className={styles.dropdownBtn}
                  onClick={toggleDropdown}
                  role="button"
                  tabIndex="0"
                
                >
                  Select Meters
                </div>
                {dropdownOpen && (
                  <div className={styles.checkboxGroup}>
                    <label>
                      <input type="checkbox" value="Meter 1" onChange={handleMeterChange} checked={selectedMeters.includes('Meter 1')} />
                      Meter 1
                    </label>
                    <label>
                      <input type="checkbox" value="Meter 2" onChange={handleMeterChange} checked={selectedMeters.includes('Meter 2')} />
                      Meter 2
                    </label>
                    <label>
                      <input type="checkbox" value="Meter 3" onChange={handleMeterChange} checked={selectedMeters.includes('Meter 3')} />
                      Meter 3
                    </label>
                  </div>
                )}
              </div>

              <select className={styles.selector} onChange={handleParameterChange}>
                <option value="" hidden>Select Parameters</option>
                <option value="High Current">High Current</option>
                <option value="Low Voltage">Low Voltage</option>
                <option value="High Voltage">High Voltage</option>
              </select>

              <input type="date" className={styles.datePicker} onChange={handleStartDateChange} />
              <input type="date" className={styles.datePicker} onChange={handleEndDateChange} />

              <button className={styles.generateButton} onClick={generateChart}>Generate Trend</button>
            </div>
          </div>
        </div>

        <div className={styles.card_Small}>
          <div className={styles.content}>
            {chartData && <canvas ref={chartRef} width="400" height="200" style={{ margintop: '50px' }}></canvas>}
          </div>
        </div>

      </div>
    </div>
  );
}
