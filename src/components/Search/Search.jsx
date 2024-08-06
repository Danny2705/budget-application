import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { algoliaConfig, searchClient } from "../../utils/algolia";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//algolia documentation
const index = searchClient.initIndex(algoliaConfig.ALGOLIA_INDEX_NAME);

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const budgets = useSelector((state) => state.budgets.budgets);

  useEffect(() => {
    const fetchResults = async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        const result = await index.search(search, {
          hitsPerPage: 10,
        });
        setResults(result.hits);
      } catch (error) {
        console.error("Error fetching transactions: ", error);
      }
    };

    fetchResults();
  }, [search]);

  return (
    <div className='flex flex-col justify-center items-center px-4'>
      <div className='flex items-center justify-center'>
        <input
          type='text'
          placeholder='Search by item name, vendor, city or date'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-[300px] md:w-[500px] text-white bg-transparent border-2 border-secondary-orangeRed p-[0.25rem] md:p-2 outline-none rounded-md'
        />
        <div className='p-1 hover:bg-gray-800 rounded-full cursor-pointer duration-200'>
          <IoSearch size={30} className='text-secondary-orangeRed' />
        </div>
      </div>

      {search && results.length > 0 && (
        <div className='w-[300px] md:w-[530px] relative'>
          <ul className='text-white absolute w-full z-[11] -left-1 rounded-lg mt-2 bg-gray-800 p-4 h-[600px] overflow-y-auto'>
            {results.map(
              (result) => (
                console.log(result),
                (
                  <Link
                    to={`transaction/${result.id}`}
                    key={result.id}
                    className='flex mb-3 w-full gap-4 border-b pb-3'
                  >
                    <li>
                      <img
                        src={result.vendor.logo}
                        alt='Vendor logo'
                        width={100}
                        className='rounded-full'
                      />
                    </li>
                    <li className='w-full flex justify-between items-start'>
                      <div>
                        <div>
                          <span className='large-h1-span'>Address:</span>{" "}
                          {result?.vendor.address
                            ? result?.vendor.address
                            : "updating..."}
                        </div>
                        <div>
                          <span className='large-h1-span'>Category:</span>{" "}
                          {result?.category}
                        </div>
                        <div>
                          <span className='large-h1-span'>Type:</span>{" "}
                          {result?.vendor.type
                            ? result?.vendor.type
                            : "updating..."}
                        </div>
                        <div>
                          <span className='large-h1-span'>Date:</span>{" "}
                          {result?.date ? result?.date : "updating..."}
                        </div>
                      </div>
                      <div>
                        <img
                          src={result?.imageURLs}
                          alt='vendor receipts'
                          width={50}
                        />
                      </div>
                    </li>
                  </Link>
                )
              )
            )}
          </ul>
        </div>
      )}

      {search && results.length === 0 && (
        <div className='w-[300px] md:w-[530px] relative'>
          <ul className='text-white absolute w-full z-10 -left-1 rounded-lg mt-2 bg-gray-800 px-4 py-2'>
            <li>No results found</li>
          </ul>
        </div>
      )}
    </div>
  );
}
