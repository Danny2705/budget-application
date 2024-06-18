// Reference: a) "Chart.js documentation for charts" - https://www.chartjs.org/docs/latest/charts/doughnut.html#pie b) ChatGPT refence chartjs-2
// NOT USED YET: TODO? change to a line chart
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // const labels = ["January", "February", "March", "April", "May",];
  const LineGraphData = {
    labels: ["January", "February", "March", "April", "May",],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        showLine: true,
        color: "white",
        borderColor: "Green",
        backgroundColor: "rgb(255, 16, 240)",
      },
    ],
  };

  return (
    <div>
      <div className="w-[600px] h-[400px]">
        <div>
          <Line options={options} data={LineGraphData} />
        </div>
      </div>
    </div>
  );
}
