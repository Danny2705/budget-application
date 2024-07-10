// Reference from ChatGPT [Modified]: {i want to be able to calculate and accumulate the total money the user spend}

import { useState, useEffect } from "react";
import { transactionData } from "../TransactionTable/Data";
import { subMonths, format, formatDate } from "date-fns";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";

export default function useExpenseData() {
  const [labels, setLabels] = useState([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState({});
  const [totalBudgetLimit, setTotalBudgetLimit] = useState({});
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchBudgetData = async () => {
      const docRef = await getDocs(collection(db, `users/${user.uid}/budget`));
      const budgetData = docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const month =  budgetData.map((data, index) => getMonthFromTimeStamp(data.endDate.seconds));

    };

    const getMonths = () => {
      const months = [];
      for (let i = 4; i >= 0; i--) {
        months.push(format(subMonths(new Date(), i), "MMMM"));
      }
      setLabels(months);
    };

    const getMonthFromTimeStamp = (seconds) => {
        const date = new Date(seconds * 1000);
        return format(date, 'MMMM');
    }
    const calculateMonthlyMoney = (data) => {
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
    setTotalMoneySpent(calculateMonthlyMoney(transactionData));
    // setTotalBudgetLimit(calculateMonthlyMoney(FetchBudgetData()));
    FetchBudgetData();
    console.log(totalBudgetLimit);
    console.log(totalMoneySpent);
  }, [user, dispatch]);

  return { labels, totalMoneySpent, totalBudgetLimit };
}
