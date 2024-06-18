import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function NewTransLineItemsTable({ receiptInfo }) {
  const lineItems = receiptInfo?.[0]?.line_items ?? [];
  console.log('!!!receiptInfo', receiptInfo, lineItems)

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
              {lineItems.map((item) => {
                return (
                  <tr className="bg-[#1D1E42]">
                    <td className="border-b px-[80px] py-2 text-center">
                      {item.description}
                    </td>
                    <td className="border-b border-l px-[40px] py-2">
                      {item.price ? `${item.price} / ${item.unit_of_measure == null ? "item" : item.unit_of_measure}` : `${item.total/item.quantity} / ${item.unit_of_measure == null ? "item" : item.unit_of_measure}`}
                    </td>
                    <td className="border-b border-l px-4 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border-b border-l px-[32px] py-2">
                      {item.total}
                    </td>
                    <td className="border-b border-l px-[32px] py-2 text-center">
                      {item.type}
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
