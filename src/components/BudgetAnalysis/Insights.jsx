import { useDispatch, useSelector } from "react-redux";
import { Download } from "@mui/icons-material";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";

export default function Insights() {
  const user = useSelector((state) => state.auth.user);

  const moneySpent = {
    April: 300,
    May: 450,
    June: 200,
    July: 250,
  };

  const budgetLimit = 500;

  const calculateSavings = (month) => {
    const spent = moneySpent[month] || 0;
    const savings = budgetLimit - spent;
    return savings;
  };

  const handleDownloadReportAnalysis = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    const receiptData = [
      {
        TransactionNo: "2465343",
        Vender: "Walgreens",
        Date: "04/15/2024",
        Category: "Grocery",
        Total: "50.00",
      },
      {
        TransactionNo: "2465344",
        Vender: "Walmart",
        Date: "05/22/2024",
        Category: "Food",
        Total: "60.00",
      },
      {
        TransactionNo: "2465345",
        Vender: "AB Clean",
        Date: "06/13/2024",
        Category: "Housing",
        Total: "70.00",
      },
      {
        TransactionNo: "2465346",
        Vender: "Walgreens",
        Date: "07/02/2024",
        Category: "Grocery",
        Total: "50.00",
      },
      {
        TransactionNo: "2465347",
        Vender: "Walmart",
        Date: "04/27/2024",
        Category: "Food",
        Total: "60.00",
      },
      {
        TransactionNo: "2465348",
        Vender: "CC Car Wash",
        Date: "05/11/2024",
        Category: "Car",
        Total: "30.00",
      },
      {
        TransactionNo: "2465349",
        Vender: "Best Buy",
        Date: "06/20/2024",
        Category: "Electronics",
        Total: "120.00",
      },
      {
        TransactionNo: "2465350",
        Vender: "Starbucks",
        Date: "07/05/2024",
        Category: "Food",
        Total: "15.00",
      },
      {
        TransactionNo: "2465351",
        Vender: "Home Depot",
        Date: "04/18/2024",
        Category: "Home Improvement",
        Total: "85.00",
      },
      {
        TransactionNo: "2465352",
        Vender: "Target",
        Date: "05/25/2024",
        Category: "Clothing",
        Total: "90.00",
      },
      {
        TransactionNo: "2465353",
        Vender: "BP Gas Station",
        Date: "06/29/2024",
        Category: "Car",
        Total: "40.00",
      },
    ];

    doc.text("Receipt Report", 10, 10);
    receiptData.forEach((receipt, index) => {
      doc.text(
        `${receipt.TransactionNo} | ${receipt.Vender} | ${receipt.Date} | ${receipt.Category} | ${receipt.Total}`,
        10,
        20 + index * 10
      );
    });

    doc.save("report.pdf");
  };

  return (
    <div className="flex w-1/3 min-h-20 max-h-40 bg-[#31164c] align-middle gap-1 flex-col p-4 m-4 rounded-lg border border-main-neonPink text-white">
      <div className=" text-2xl text-bold">Insights</div>
      <div className=" rounded-lg m-3 p-2 ">Hello {user.displayName}</div>
      <div className="flex flex-col gap-2">
        {Object.keys(moneySpent).map((month) => {
          const savings = calculateSavings(month);
          return (
            <div key={month} className="m-2 p-2 bg-[#412f5a] rounded">
              {savings >= 0 ? (
                <div>
                  Hi {user.displayName}, you have saved ${savings} in {month}, which is good.
                </div>
              ) : (
                <div>
                  Hi {user.displayName}, you were unable to save in {month} and overspent by ${-savings}.
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-1">
        <div className=" font-bold">Download report analysis</div>
        <FiDownload
          className="text-cyan-400 hover:text-cyan-800 text-2xl"
          onClick={handleDownloadReportAnalysis}
        />
      </div>
    </div>
  );
}
