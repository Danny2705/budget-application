import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function NewTransVenderTable({ receiptInfo }) {
  return (
    <div>
      <h1 className="text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-8 tracking-wider text-center lg:text-left">
        Vendor information
      </h1>
      <div className="flex justify-center">
        <div className="py-[8px] overflow-x-scroll px-[48px]">
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
                  Tip(CAD$)
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
              <tr className="bg-[#1D1E42]">
                <td className="border-b px-4 py-2 text-center">
                  {receiptInfo.vendor.name}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                  {receiptInfo.date}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                  {receiptInfo.vendor.address}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                  {receiptInfo.category}
                </td>
                <td className="border-b border-l px-[32px] py-2">
                  {receiptInfo.subtotal}
                </td>
                <td className="border-b border-l px-[32px] py-2">
                  {receiptInfo.tax}
                </td>
                <td className="border-b border-l px-[32px] py-2">
                  {receiptInfo.tip === null ? 0 : receiptInfo.tip}
                </td>
                <td className="border-b border-l px-[32px] py-2">
                  {receiptInfo.total}
                </td>
                <td className="border-b border-l px-4 py-2">
                  <div className="flex flex-row justify-center">
                    <button className="pr-[32px]">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#624DE3" }}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#A30D11" }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
