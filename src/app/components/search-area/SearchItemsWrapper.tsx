import React, { useEffect, useState, Suspense } from "react";
import SearchItems from "./search-items";
import { fetchJobs } from "@/hooks/server-request/job_post";


const SearchItemsWrapper =  ({all_jobs}:{all_jobs:any[]}) => {
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SearchItems all_jobs={all_jobs}/>
      </Suspense>
    );
  };
  
  export default SearchItemsWrapper;