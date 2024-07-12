import { useState, useEffect } from "react";
import { subMonths, format } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { transactionData } from "../TransactionTable/Data.jsx";

export default function useExpenseData() {
  const [labels, setLabels] = useState([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState({});
  const [totalBudgetLimit, setTotalBudgetLimit] = useState({});
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMonthFromTimeStamp = (seconds) => {
      if (seconds) {
        const date = new Date(seconds * 1000);
      }'0.
        '
      formatDate(date, "MMMM yyyy")
      return format(date, "MMMM yyyy");
    };

    const FetchBudgetData = async () => {
      const docRef = await getDocs(collection(db, `users/${user.uid}/budget`));
      const budgetData = docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const monthAmounts = budgetData.map((data) => ({
        Date: getMonthFromTimeStamp(data.endDate.seconds),
        Total: parseFloat(data.amount),
      }));
      console.log('Budget Data:', monthAmounts);
      return monthAmounts;
    };

    const getMonths = () => {
      const months = [];
      for (let i = 4; i >= 0; i--) {
        months.push(format(subMonths(new Date(), i), "MMMM yyyy"));
      }
      setLabels(months);
    };

    const calculateMonthlyMoney = (data) => {
      const monthlyTotals = {};
      data.forEach((transaction) => {
        const month = transaction.Date;
        if (!monthlyTotals[month]) {
          monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += transaction.Total;
      });
      return (monthlyTotals);
    };

    const fetchAndCalculate = async () => {
      getMonths();

      const totalMoneySpentResult = calculateMonthlyMoney(transactionData);
      setTotalMoneySpent(totalMoneySpentResult);

      const budgetData = await FetchBudgetData();
      const totalBudgetLimitResult = calculateMonthlyMoney(budgetData);
      setTotalBudgetLimit(totalBudgetLimitResult);

      console.log('Budget Limit:', totalBudgetLimitResult);
      console.log('Money Spent:', totalMoneySpentResult);
    };

    fetchAndCalculate();
  }, [user, dispatch]);

  return { labels, totalMoneySpent, totalBudgetLimit };
}
