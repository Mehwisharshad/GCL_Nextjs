// Custom_div.js
"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class Custom_div extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            chart: null, // Store the amCharts chart instance
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chartConfig !== this.props.chartConfig) {
            this.renderChart();
        }
    }

    componentWillUnmount() {
        if (this.state.chart) {
            this.state.chart.dispose();
        }
    }

    getPeriodData(periodOption) {
        if (periodOption === "Today over Yesterday") {
            return [
                { category: "00:00", value1: 100, value2: 90 },
                { category: "06:00", value1: 120, value2: 110 },
                { category: "12:00", value1: 150, value2: 130 },
                { category: "18:00", value1: 170, value2: 160 },
                { category: "24:00", value1: 140, value2: 130 },
            ];
        } else if (periodOption === "This Week over Last Week") {
            return [
                { category: "Monday", value1: 300, value2: 280 },
                { category: "Tuesday", value1: 350, value2: 320 },
                { category: "Wednesday", value1: 380, value2: 340 },
                { category: "Thursday", value1: 400, value2: 360 },
                { category: "Friday", value1: 420, value2: 380 },
                { category: "Saturday", value1: 390, value2: 370 },
                { category: "Sunday", value1: 370, value2: 350 },
            ];
        } else if (periodOption === "This Month over Last Month") {
            return [
                { category: "Week 1", value1: 800, value2: 750 },
                { category: "Week 2", value1: 850, value2: 780 },
                { category: "Week 3", value1: 900, value2: 830 },
                { category: "Week 4", value1: 920, value2: 870 },
            ];
        }
        return [];
    }

    filterDataByDateRange(data, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return data.filter(item => {
            const date = new Date(item.category);
            return date >= start && date <= end;
        });
    }

    renderChart = () => {
        const { chartConfig } = this.props;
        const chartId = `chartdiv-${this.props.divIndex}`;

        if (this.state.chart) {
            this.state.chart.dispose();
        }

        if (chartConfig) {
            let chart;
            const baseColor = am4core.color(chartConfig.color);

            let data;
            if (chartConfig.chartType === "groupedBar") {
                data = this.getPeriodData(chartConfig.periodOption);
            } else {
                const originalData = [
                    { category: "2024-08-01", value1: 120, value2: 140 },
                    { category: "2024-08-15", value1: 150, value2: 130 },
                    { category: "2024-09-01", value1: 200, value2: 180 },
                    { category: "2024-09-15", value1: 130, value2: 170 },
                    { category: "2024-10-01", value1: 170, value2: 160 },
                    { category: "2024-10-15", value1: 160, value2: 150 },
                ];
                data = this.filterDataByDateRange(
                    originalData,
                    chartConfig.startDate,
                    chartConfig.endDate
                );
            }

            if (chartConfig.chartType === "groupedBar") {
                chart = am4core.create(chartId, am4charts.XYChart);
                chart.logo.disabled = true;

                const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "category";
                categoryAxis.renderer.minGridDistance = 30;
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.grid.template.disabled = false;
                categoryAxis.renderer.cellStartLocation = 0.2;
                categoryAxis.renderer.cellEndLocation = 0.8;
                categoryAxis.renderer.labels.template.verticalCenter = "middle";

                const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.grid.template.disabled = false;

                const series1 = chart.series.push(new am4charts.ColumnSeries());
                series1.dataFields.valueY = "value1";
                series1.dataFields.categoryX = "category";
                series1.name = "Current Period";
                series1.fill = am4core.color(baseColor.lighten(0.5));
                series1.columns.template.width = am4core.percent(70);
                series1.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
                series1.columns.template.strokeWidth = 0;

                const series2 = chart.series.push(new am4charts.ColumnSeries());
                series2.dataFields.valueY = "value2";
                series2.dataFields.categoryX = "category";
                series2.name = "Comparison Period";
                series2.fill = am4core.color(baseColor.lighten(0));
                series2.columns.template.width = am4core.percent(70);
                series2.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
                series2.columns.template.strokeWidth = 0;

                chart.legend = new am4charts.Legend();
                chart.legend.position = "bottom";
            } else if (chartConfig.chartType === "line") {
                chart = am4core.create(chartId, am4charts.XYChart);
                chart.logo.disabled = true;

                const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "category";

                const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                const series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "value1";
                series.dataFields.categoryX = "category";
                series.stroke = baseColor;
                series.strokeWidth = 3;
                series.tooltipText = "{valueY}";

            } else if (chartConfig.chartType === "bar") {
                chart = am4core.create(chartId, am4charts.XYChart);
                chart.logo.disabled = true;

                const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "category";

                const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                const series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "value1";
                series.dataFields.categoryX = "category";
                series.columns.template.tooltipText = "{valueY}";

                const colorSet = new am4core.ColorSet();
                colorSet.baseColor = baseColor;
                colorSet.stepOptions = { lightness: 0.2, hue: 0 };
                series.columns.template.adapter.add("fill", (fill, target) => colorSet.getIndex(target.dataItem.index));
                series.columns.template.strokeWidth = 0;

            } else if (chartConfig.chartType === "pie") {
                chart = am4core.create(chartId, am4charts.PieChart);
                chart.logo.disabled = true;

                const pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "value1";
                pieSeries.dataFields.category = "category";
                pieSeries.slices.template.tooltipText = "{value1}";

                const colorSet = new am4core.ColorSet();
                colorSet.baseColor = baseColor;
                colorSet.stepOptions = { lightness: 0.2, hue: 0 };
                pieSeries.slices.template.adapter.add("fill", (fill, target) => colorSet.getIndex(target.dataItem.index));
            }

            chart.data = data;

            this.setState({ chart, title: chartConfig.title });
        }
    };

    toggleExpand = () => {
        this.setState((prevState) => ({
            expanded: !prevState.expanded,
        }));
    };

    render() {
        const { expanded } = this.state;
        const { openChartPopup, chartConfig, removeChart } = this.props;
        const chartId = `chartdiv-${this.props.divIndex}`;

        return (
            <div
                className="border border-gray-300 rounded-lg shadow-md flex flex-col justify-start items-center p-4 w-full sm:w-full md:w-[49%] relative bg-white h-[42vh] opacity-70"
                style={{
                    height: expanded ? '85%' : '',
                    width: expanded ? '83%' : '',
                    position: expanded ? 'fixed' : '',
                    zIndex: expanded ? '999' : '',
                    opacity: expanded ? '1' : '',
                }}
            >
                <div className="absolute top-2 left-4 text-gray-600 font-semibold text-lg mb-2">
                    {chartConfig?.title}
                </div>
                <div className="absolute top-2 right-4 flex items-center space-x-3">
                    <span className="text-gray-600 text-sm">
                        {chartConfig && chartConfig.chartType === "groupedBar"
                            ? chartConfig.periodOption
                            : chartConfig
                                ? `${chartConfig.startDate} - ${chartConfig.endDate}`
                                : ""}
                    </span>
                    <FontAwesomeIcon icon={faExpand} className="cursor-pointer text-gray-600" onClick={this.toggleExpand} />
                    <FontAwesomeIcon icon={faTimes} className="cursor-pointer text-gray-600" onClick={removeChart} />
                </div>

                {!chartConfig && (
                    <div className="absolute flex flex-col items-center justify-center h-[90%] w-full mt-3">
                        <div
                            className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full text-6xl text-gray-400 mb-4 pb-3 cursor-pointer"
                            onClick={openChartPopup}
                        >
                            +
                        </div>
                        <div className="text-gray-400 italic">To view a Chart, select a Chart</div>
                    </div>
                )}

                <div id={chartId} className="w-[100%] h-[95%] mt-5"></div>
            </div>
        );
    }
}

export default Custom_div;
