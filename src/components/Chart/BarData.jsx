// Reference from ChatGPT [Modified]: {i want to be able to calculate and accumulate the total money the user spend}

import { useState, useEffect } from "react";
import { transactionData } from "../TransactionTable/Data";
import { subMonths, format } from "date-fns";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { setBudgets } from "../../redux/budgetSlice.js";

export default function useExpenseData() {
  const [labels, setLabels] = useState([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState({});
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchBudgetData = async () => {
        const docRef = await getDocs(collection(db, `users/${user.uid}/budget`));
        const budgetData = docRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));  
        console.log(budgetData);
      };

    const getMonths = () => {
      const months = [];
      for (let i = 4; i >= 0; i--) {
        months.push(format(subMonths(new Date(), i), "MMMM"));
      }
      setLabels(months);
    };

    const calculateMonthlySpending = (data) => {
      const monthlyTotals = {};
      data.forEach((transaction) => {
        const date = new Date(transaction.Date);
        const monthYear = format(date, "MMMM");

        if (!monthlyTotals[monthYear]) {
          monthlyTotals[monthYear] = 0;
        }

        monthlyTotals[monthYear] += parseFloat(transaction.Total);
      });

      return monthlyTotals;
    };

    getMonths();
    setTotalMoneySpent(calculateMonthlySpending(transactionData));
    setTotalBudgetLimit(1);
    FetchBudgetData();
  }, [user, dispatch]);

  return { labels, totalMoneySpent, totalBudgetLimit };
}
