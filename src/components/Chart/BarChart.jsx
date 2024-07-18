import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import useExpenseData from "./BarData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  Filler,
  zoomPlugin
);

export default function Barchart() {
  const { labelState, totalMoneySpent, totalBudgetLimit, allLabels, setLabelState } = useExpenseData();
  const moneySpent = labelState.map((month) => totalMoneySpent[month] || 0);
  const budgetLimit = labelState.map((month) => totalBudgetLimit[month] || 0);

  const chartRef = useRef(null);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Budget Analysis",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => `${value}`,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          color: "white",
          text: "Month",
          font: { size: 16 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          color: "white",
          text: "Amount ($)",
          font: { size: 16 },
        },
        grid: {
          display: true,
        },
      },
    },
    barPercentage: 1.0,
    categoryPercentage: 0.7,
  };

  const BarData = {
    labels: labelState,
    datasets: [
      {
        label: "Money Spent",
        data: moneySpent,
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        label: "Budget Limit",
        data: budgetLimit,
        borderColor: "rgba(0, 255, 0, 1)",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
    ],
  };

  const handleScroll = (direction) => {
    const currentIndex = allLabels.indexOf(labelState[0]);
    let newLabels;

    if (direction === "left") {
      newLabels = allLabels.slice(Math.max(currentIndex - 5, 0), currentIndex);
    } else {
      newLabels = allLabels.slice(currentIndex + 5, currentIndex + 10);
    }

    if (newLabels.length > 0) {
      setLabelState(newLabels);
    }
  };

  return (
    <div className="w-2/3">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handleScroll("left")}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Previous
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Current
        </button>
      </div>
      <Bar ref={chartRef} options={options} data={BarData} />
    </div>
  );
}
