import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const transactionData = [
  {
    Vender: "Walmart",
    Date: "03/28/2023",
    Location: "Calgary, CA",
    Category: "Food & Drink",
    Subtotal: "27.60",
    Tax: "1.93",
    Total: "29.53",
  },
];

export default function NewTransVenderTable() {
  return (
    <div className="py-[48px] flex justify-center">
      <div className="py-[48px] overflow-x-scroll px-[48px]">
        <table className="bg-[#26264F] text-white border-separate border rounded-lg">
          <thead>
            <tr>
              {/* control boarder radius of the table head; refer from 
            https://stackoverflow.com/questions/4932181/rounded-table-corners-css-only */}
              <th className="border-b px-3 py-2 bg-[#1D1E42] text-white">
                Vender
              </th>
              <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                Date
              </th>
              <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                Location
              </th>
              <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                Category
              </th>
              <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                Subtotal(CAD$)
              </th>
              <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                Tax(CAD$)
              </th>
              <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                Total(CAD$)
              </th>
              <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
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
                    {val.Vender}
                  </td>
                  <td className="border-b border-l px-4 py-2 text-center">
                    {val.Date}
                  </td>
                  <td className="border-b border-l px-4 py-2 text-center">
                    {val.Location}
                  </td>
                  <td className="border-b border-l px-4 py-2 text-center">
                    {val.Category}
                  </td>
                  <td className="border-b border-l px-[32px] py-2">
                    {val.Subtotal}
                  </td>
                  <td className="border-b border-l px-[32px] py-2">
                    {val.Tax}
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
    </div>
  );
}
