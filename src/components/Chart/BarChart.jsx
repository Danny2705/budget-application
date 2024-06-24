import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const options = {};
const BarData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Money Spent",
      data: [100, 2000, 400, 1100, 250, 500, 400],
      borderColor: 
        "rgb(255, 105, 180)",
      backgroundColor: "rgb(178, 34, 34)",

    },
    {
      label: "Budget Limit",
      data: [200, 1500, 500, 2000, 500, 550, 1000],
      borderColor: "rgb(255, 105, 180)",
      backgroundColor: "rgb(144, 238, 144)",
    },
  ],
};
export default function Barchart() {
  return (
    <div className="w-2/3 h-full py-10">
      <Bar options={options} data={BarData} />
    </div>
  );
}
