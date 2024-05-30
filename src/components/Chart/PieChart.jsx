import { Pie } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";

chartjs.register(ArcElement, Tooltip, Legend);

export default function PieChart(){
    const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
    return <div>
        <div className="w-[50px] h-[50px]">
            <Pie data={data} />
        </div>
    </div>
}