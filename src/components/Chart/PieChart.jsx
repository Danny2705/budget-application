import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart() {
  const [transactionLabels, setTransactionLabels] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const params = useParams();

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: "black",
        display: true,
        font: {
          size: 15,
        },
        formatter: (value, context) => {
          let sum = 0;
          const dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach((data) => {
            sum += data;
          });
          const percentage = ((value * 100) / sum).toFixed(1) + "%";
          const digit = "$" + value;
          return digit + "\n" + percentage;
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const fetchTransactions = async () => {
    if (user) {
      try {
        const transactionsSnapshot = await getDocs(
          collection(db, "budgets", params.id, "receipts")
        );
        const transactions = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return transactions;
      } catch (error) {
        console.error("Error fetching user transactions:", error);
        return [];
      }
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactions();
      const categoryAmountMap = new Map();
      transactions.forEach((transaction) => {
        const category = transaction.category;
        const amount = parseFloat(transaction.total); // Ensure 'total' is used instead of 'amount'
        if (categoryAmountMap.has(category)) {
          categoryAmountMap.set(
            category,
            categoryAmountMap.get(category) + amount
          );
        } else {
          categoryAmountMap.set(category, amount);
        }
      });

      const transCategories = Array.from(categoryAmountMap.keys());
      const transAmounts = Array.from(categoryAmountMap.values());

      setTransactionLabels(transCategories);
      setTransactionAmount(transAmounts);
    };

    fetchData();
  }, [user, params.id]);

  const pieChartData = {
    labels: transactionLabels,
    datasets: [
      {
        label: "Money spent",
        data: transactionAmount,
        borderColor: "none",
        backgroundColor: [
          "#ffe6f2",
          "#ffccdd",
          "#ffb3c9",
          "#ff99b5",
          "#ff80a0",
          "#ff668c",
          "#ff4d78",
          "#ff3363",
          "#ff1a4f",
          "#ff003b",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex justify-center align-middle"> 
      <div className="w-1/2">
        <Pie options={options} data={pieChartData} />
      </div>
    </div>
  );
}
