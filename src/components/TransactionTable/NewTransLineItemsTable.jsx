import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function NewTransLineItemsTable({ receiptInfo }) {
  const lineItems = receiptInfo?.line_items ?? [];
  console.log("!!!receiptInfo", receiptInfo, lineItems);

  return (
    <div>
      <h1 className="text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-8 tracking-wider text-center lg:text-left">
        Line items
      </h1>

      <div className="wrapper mx-auto gap-1 py-4 w-full overflow-x-auto md:overflow-x-visible">
        <div className="">
          <div className="grid grid-cols-7 gap-2  rounded-t-xl p-4 text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <div className="text-center">No.</div>
            <div className="text-center">Item</div>
            <div className="text-center">Price(CAD$)</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Total(CAD$)</div>
            <div className="text-center">Category</div>
            <div className="text-center">Action</div>
          </div>
            {lineItems?.map((item, index) => (
              <div
                key={item.order}
                className={`grid grid-cols-7 gap-2 p-4 ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } text-white ${index === lineItems.length - 1 ? "rounded-b-xl" : ""}`}
              ><div className="text-center">{item.order+1}</div>
                <div className="text-center">{item.description}</div>
                <div className="text-center">
                  {item.price
                    ? `${item.price} / ${
                        item.unit_of_measure == null
                          ? "item"
                          : item.unit_of_measure
                      }`
                    : `${item.total / item.quantity} / ${
                        item.unit_of_measure == null
                          ? "item"
                          : item.unit_of_measure
                      }`}
                </div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-center">{item.total}</div>
                <div className="text-center">{item.type}</div>
                <div className="flex justify-center gap-2">
                  <button className="pr-[16px]">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#9E5EED" }}
                    />
                  </button>
                  <button>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ color: "#DD5250" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
