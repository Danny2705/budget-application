// Reference: a) "Chart.js documentation for charts" - https://www.chartjs.org/docs/latest/charts/doughnut.html#pie b) ChatGPT refence chartjs-2
//
import { Pie } from "react-chartjs-2";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import jsonData from "./ChartData.json";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ transactionDetails }) {
  const [transactionLables, setTransactionLabels] = useState(["jesse"]);

  const pieChartData = {
    labels: transactionLables,
    datasets: [
      {
        label: "Pie Chart Describing transaction category versus money spent",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <div className="w-[500px] h-[400px]">
        <div>{}</div>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
}
