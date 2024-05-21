import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const transactionData = [
  {
    TransactionNo: "2465343",
    Vender: "Walgreens",
    Date: "03/28/2023",
    Category: "Grocery",
    Total: "$50.00",
  },
  {
    TransactionNo: "2465344",
    Vender: "Walmart",
    Date: "03/29/2023",
    Category: "Food",
    Total: "$60.00",
  },
  {
    TransactionNo: "2465345",
    Vender: "AB Clean",
    Date: "03/30/2023",
    Category: "Housing",
    Total: "$70.00",
  },
  {
    TransactionNo: "2465346",
    Vender: "Walgreens",
    Date: "03/31/2023",
    Category: "Grocery",
    Total: "$50.00",
  },
  {
    TransactionNo: "2465347",
    Vender: "Walmart",
    Date: "04/01/2023",
    Category: "Food",
    Total: "$60.00",
  },
  {
    TransactionNo: "2465348",
    Vender: "CC Car Wash",
    Date: "04/02/2023",
    Category: "Car",
    Total: "$30.00",
  },
];

export default function RecentTransactionTable() {
  return (
    <div className="py-[48px] flex justify-center">
      <table className="bg-[#26264F] text-white border-separate border rounded-lg">
        <thead>
          <tr>
            {/* control boarder radius of the table head; refer from 
            https://stackoverflow.com/questions/4932181/rounded-table-corners-css-only */}
            <th className="border-b px-[64px] py-2 bg-[#1D1E42] text-white">
              Transaction No.
            </th>
            <th className="border-b border-l px-[64px] py-2 bg-[#1D1E42] text-white">
              Vender
            </th>
            <th className="border-b border-l px-[64px] py-2 bg-[#1D1E42] text-white">
              Date
            </th>
            <th className="border-b border-l px-[64px] py-2 bg-[#1D1E42] text-white">
              Category
            </th>
            <th className="border-b border-l px-[64px] py-2 bg-[#1D1E42] text-white">
              Total(CAD$)
            </th>
            <th className="border-b border-l px-[64px] py-2 bg-[#1D1E42] text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-white">
          {transactionData.map((val, key) => {
            return (
              /* switch color of the row refer from https://chatgpt.com/
            bg-[#26264F] and bg-[#1D1E42] are the colors used in the Figma Design
            */
              <tr
                key={key}
                className={key % 2 === 0 ? "bg-[#26264F]" : "bg-[#1D1E42]"}
              >
                <td className="border-b px-4 py-2 text-center">
                  {val.TransactionNo}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                  {val.Vender}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                  {val.Date}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                  {val.Category}
                </td>
                <td className="border-b border-l px-[32px] py-2">
                  {val.Total}
                </td>
                <td className="border-b border-l px-4 py-2">
                  <div className="flex flex-row justify-center">
                    <button className="pr-[32px]">
                      {/* #624DE3 is the color in the Figna Design */}
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#624DE3" }}
                      />
                    </button>
                    <button>
                      {/* #A30D11 is the color in the Figna Design */}
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#A30D11" }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
