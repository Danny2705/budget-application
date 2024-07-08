import { useState, useEffect } from "react";
import { transactionData } from "../TransactionTable/Data";
import { subMonths, format } from "date-fns";

export default function useExpenseData() {
  const [month, setMonth] = useState("");
  const [totalMoneySpent, setTotalMoneySpent] = useState({});
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(null);

  useEffect(() => {
    const calculateMonthlySpending = (data) => {
      const monthlyTotals = {};
      data.forEach((transaction) => {
        const date = new Date(transaction.Date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

        if (!monthlyTotals[monthYear]) {
          monthlyTotals[monthYear] = 0;
        }
        monthlyTotals[monthYear] += parseFloat(transaction.Total);
      });

      return monthlyTotals;
    };

    const monthlySpending = calculateMonthlySpending(transactionData);
    console.log(monthlySpending);

    setMonth("my month");
    setTotalMoneySpent(monthlySpending);
    setTotalBudgetLimit(1);
  }, []);

  return { month, totalBudgetLimit, totalMoneySpent };
}
