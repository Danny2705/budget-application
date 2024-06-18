import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function NewTransVenderTable({ receiptInfo }) {
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
            {receiptInfo?.map((info) => (
              <tr className="bg-[#1D1E42]">
                <td className="border-b px-4 py-2 text-center">
                  {info.vendor.name}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                {info.date}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                {info.vendor.address}
                </td>
                <td className="border-b border-l px-4 py-2 text-center">
                {info.category}
                </td>
                <td className="border-b border-l px-[32px] py-2">{info.subtotal}</td>
                <td className="border-b border-l px-[32px] py-2">{info.tax}</td>
                <td className="border-b border-l px-[32px] py-2">{info.tip === null ? 0 : info.tip}</td>
                <td className="border-b border-l px-[32px] py-2">{info.total}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
