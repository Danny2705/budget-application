// Reference: a) "Chart.js documentation for charts" - https://www.chartjs.org/docs/latest/charts/doughnut.html#pie b) ChatGPT refence chartjs-2
// NOT USED YET: TODO? change to a line chart
import { Bar } from "react-chartjs-2";
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

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const BarChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Steps",
        data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
        borderColor: "blue",
        backgroundColor: "red",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="w-[600px] h-[400px]">
        <div>
          <Bar options={options} data={BarChartData} />
        </div>
      </div>
    </div>
  );
}
