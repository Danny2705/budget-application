import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSave } from "@fortawesome/free-regular-svg-icons";

export default function NewTransLineItemsTable({
  receiptInfo,
  setReceiptData,
}) {
  const [lineItems, setLineItems] = useState(receiptInfo?.line_items ?? []);
  const navigate = useNavigate();

  const handleInputChange = (index, field, value) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][field] = value;
    setLineItems(updatedLineItems);
    setReceiptData((prevData) => ({
      ...prevData,
      line_items: updatedLineItems,
    }));
    console.log(receiptInfo.line_items);
  };

  const handleDeleteClick = (index) => {
    const updatedLineItems = lineItems.filter((_, i) => i !== index);
    setLineItems(updatedLineItems);
    setReceiptData((prevData) => ({
      ...prevData,
      line_items: updatedLineItems,
    }));
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full'>
        <div className='flex items-center mb-4 w-full justify-between'>
          <h2 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-4 tracking-wider text-center lg:text-left'>
            Line Items
          </h2>
        </div>
        <div className='w-full'>
          <table className='text-white rounded-lg w-full border-collapse overflow-hidden'>
            <thead>
              <tr className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                <th className='py-2 px-3 text-white rounded-tl-lg'>No</th>
                <th className='p-4 text-white'>Item</th>
                <th className='p-4 text-white'>Price (CAD$)</th>
                <th className='p-4 text-white'>Quantity</th>
                <th className='p-4 text-white'>Total (CAD$)</th>
                <th className='p-4 text-white'>Category</th>
                <th className='p-4 text-white rounded-tr-lg'>Action</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {lineItems.map((item, index) => (
                <tr key={index} className='bg-gray-800'>
                  <td className='p-4 text-center'>{item.order + 1}</td>
                  <td className='p-4 text-center'>
                    <input
                      type='text'
                      value={item.description || ""}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                    />
                  </td>
                  <td className='p-4 text-center'>
                    <input
                      type='text'
                      value={item.price || 0}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                    />
                  </td>
                  <td className='p-4 text-center'>
                    <input
                      type='text'
                      value={item.quantity || 0}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                    />
                  </td>
                  <td className='p-4 text-center'>
                    <input
                      type='text'
                      value={item.total || 0}
                      onChange={(e) =>
                        handleInputChange(index, "total", e.target.value)
                      }
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                    />
                  </td>
                  <td className='p-4 text-center'>
                    <input
                      type='text'
                      value={item.type || ""}
                      onChange={(e) =>
                        handleInputChange(index, "type", e.target.value)
                      }
                      className='w-full bg-transparent border-gray-600 rounded px-2 py-1 text-center'
                    />
                  </td>
                  <td className='p-4 text-center'>
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className='mr-2'
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#DD5250" }}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ color: "#4CAF50" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
