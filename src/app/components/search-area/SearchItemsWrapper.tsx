import React, { useEffect, useState, Suspense } from "react";
import SearchItems from "./search-items";


const SearchItemsWrapper = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SearchItems />
      </Suspense>
    );
  };
  
  export default SearchItemsWrapper;