import React, { useState, useEffect, useCallback } from "react";
import { algoliaConfig, searchClient } from "../../utils/algolia";

const index = searchClient.initIndex(algoliaConfig.ALGOLIA_INDEX_NAME);
const Hit = ({ hit }) => {
    const handleShowImage = () => {
        window.open(hit.imageURLs, "_blank");
      };

    return (
        <div className="bg-gray-300">
        <h2>{hit.ocr_text}</h2>
        {/* <button onClick={handleShowImage}>View receipt image</button> */}
        </div>
    );
};

const AlgoliaSearch = () => {
    const [search, setSearch] = useState("");
    const [hits, setHits] = useState([]);
  
    const doSearch = useCallback(async () => {
        const result = await index.search(search, {
          hitsPerPage: 10,
           
        });
        setHits(result.hits);
      }, [search]);
    
      useEffect(() => {
        doSearch();
      }, [doSearch]);
    
      return (
        <div>
          <input
            type="text"
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search your receipts"
          />
          <button onClick={doSearch} hidden />
          {hits.map((hit) => (
            <Hit hit={hit} key={hit.objectID} />
          ))}
        </div>
      );
    };


export default AlgoliaSearch;