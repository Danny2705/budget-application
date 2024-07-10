// reference from chatGPT[Modified]: {Can you tell me how id be able to export data from my application?}
import { useDispatch, useSelector } from "react-redux";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";
import { transactionData } from "../TransactionTable/Data";


export default function Insights() {
  const user = useSelector((state) => state.auth.user);

  const moneySpent = {
    April: 300,
    May: 450,
    June: 200,
    July: 250,
  };

  // default limit value
  const budgetLimit = 500;

  const calculateSavings = (month) => {
    const spent = moneySpent[month] || 0;
    const savings = budgetLimit - spent;
    return savings;
  };

  const handleDownloadReportAnalysis = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    const receiptData = transactionData;

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
