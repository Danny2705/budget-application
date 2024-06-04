import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { NewTransactionData } from "./Data";


export default function NewTransLineItemsTable() {
  return (
    <div className="py-[48px] flex justify-center">
      <div className="py-[48px] overflow-x-scroll px-[48px]">
        <div className="max-h-[400px] overflow-y-auto px-[16px]">
          <table className="bg-[#26264F] text-white border-separate border rounded-lg">
            <thead>
              <tr>
                {/* control boarder radius of the table head; refer from 
            https://stackoverflow.com/questions/4932181/rounded-table-corners-css-only */}
                <th className="border-b px-3 py-2 bg-[#1D1E42] text-white">
                  Item
                </th>
                <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                  Price(CAD$)
                </th>
                <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                  Quantity
                </th>
                <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                  Total(CAD$)
                </th>
                <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                  Category
                </th>
                <th className="border-b border-l px-3 py-2 bg-[#1D1E42] text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {NewTransactionData.map((val, key) => {
                return (
                  /* switch color of the row refer from https://chatgpt.com/
            bg-[#26264F] and bg-[#1D1E42] are the colors used in the Figma Design
            */
                  <tr
                    key={key}
                    className={key % 2 === 0 ? "bg-[#26264F]" : "bg-[#1D1E42]"}
                  >
                    <td className="border-b px-[40px] py-2 text-center">
                      {val.Item}
                    </td>
                    <td className="border-b border-l px-[32px] py-2">
                      {val.Price}
                    </td>
                    <td className="border-b border-l px-4 py-2 text-center">
                      {val.Quantity}
                    </td>
                    <td className="border-b border-l px-[32px] py-2">
                      {val.Total}
                    </td>
                    <td className="border-b border-l px-[32px] py-2 text-center">
                      {val.Category}
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
    </div>
  );
}
