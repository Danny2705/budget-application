import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        const transactionsRef = collection(db, "transactions");

        // Create a query to search by multiple fields
        const q = query(
          transactionsRef,
          where("description", "==", search), // Search by item name
          where("vendor.name", "==", search), // Search by vendor name
          where("city", "==", search), // Search by city
          where("date", "==", search) // Search by date
        );

        const querySnapshot = await getDocs(q);

        const fetchedResults = [];

        querySnapshot.forEach((doc) => {
          fetchedResults.push({
            id: doc.id, // Document ID
            ...doc.data(), // Document data
          });
        });

        setResults(fetchedResults);
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
          <ul className='text-white absolute w-full z-10 -left-1 rounded-lg mt-2 bg-gray-800 px-4 py-2'>
            {results.map((result) => (
              <li key={result.id}>
                Receipt ID: {result.id} - Other data: {result.description} -{" "}
                {result.vendor.name} - {result.city} - {result.date}
              </li>
            ))}
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
