"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListItemTwo from "../jobs/list/list-item-2";
import JobGridItem from "../jobs/grid/job-grid-item";



const SearchItems = ({ all_jobs }: { all_jobs: any[] }) => {
console.log(all_jobs,"all_jobs all_jobs all_jobs")
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<any[]>(all_jobs);
  const [jobType, setJobType] = useState<string>("list");
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const search = searchParams.get("search");
  const company = searchParams.get("company");
  
  const categoryMatch = (item:any) => {
    return (
       item.category.toLowerCase() === category?.toLowerCase()
    );
  }
  const locationMatch = (item:any) => {
    return item.location.toLowerCase() ===location?.toLowerCase();
  }
  const companyMatch = (item:any) => {
    return item?.company?.company_name.toLowerCase() ===company?.toLowerCase();
  }
  const titleMatch = (item:any) => {
    if(search){
      return item.title.toLowerCase().includes(search.toLowerCase());
    }
  }

  useEffect(() => {
    // category && location && company && search all are match
    if (category && location && company && search) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchingCategory = categoryMatch(j)
          const matchLocation = locationMatch(j);
          const matchCompany = companyMatch(j);
          const matchTile = titleMatch(j);
          return matchingCategory && matchLocation && matchCompany && matchTile;
        })
      );
    }
    // category && location && company all are match
    if (category && location && company) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchingCategory = categoryMatch(j)
          const matchLocation = locationMatch(j);
          const matchCompany = companyMatch(j);
          return matchingCategory && matchLocation && matchCompany;
        })
      );
    }
    // category && location && search all are match
    if (category && location && search) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchingCategory = categoryMatch(j)
          const matchLocation = locationMatch(j);
          const matchTile = titleMatch(j);
          return matchingCategory && matchLocation && matchTile;
        })
      );
    }
    if (category && location) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchingCategory = categoryMatch(j)
          const matchLocation = locationMatch(j);
          return matchingCategory && matchLocation;
        })
      );
    }
    if (category && search) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchingCategory = categoryMatch(j)
          const matchTile = titleMatch(j);
          return matchingCategory && matchTile;
        })
      );
    }
    if (category) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchingCategory = categoryMatch(j)
          return matchingCategory;
        })
      );
    }
    if (location) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchLocation = locationMatch(j);
          return matchLocation;
        })
      );
    }
    if (search) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchTile = titleMatch(j);
          return matchTile;
        })
      );
    }
    if (company) {
      setJobs(
        all_jobs.filter((j: any) => {
          const matchCompany = companyMatch(j);
          return matchCompany;
        })
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, company, location, search]);
 console.log(jobs);



  return (
    <section className="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="filter-area-tab">
              <div className="light-bg border-20 ps-4 pe-4">
                <a className="filter-header border-20 d-block search" href="#">
                  <span className="main-title fw-500 text-dark">
                   {jobs.length === 0 ? 'No Products Found' : 'Search Products'} 
                  </span>
                </a>
              </div>
            </div>
          </div>

          {jobs.length > 0 && <div className="col-12">
            <div className="job-post-item-wrapper">
              <div className="upper-filter d-flex justify-content-between align-items-center mb-25 mt-70 lg-mt-40">
                <div className="total-job-found">
                  All <span className="text-dark">{jobs?.length}</span> jobs
                  found
                </div>
                <div className="d-flex align-items-center">
                  <button
                    onClick={() => setJobType("list")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
                   ${jobType === "grid" ? "active" : ""}`}
                    title="Active List"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <button
                    onClick={() => setJobType("grid")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
                  ${jobType === "list" ? "active" : ""}`}
                    title="Active Grid"
                  >
                    <i className="bi bi-grid"></i>
                  </button>
                </div>
              </div>

              <div
                className={`accordion-box list-style ${
                  jobType === "list" ? "show" : ""
                }`}
              >
                {jobs?.map((job) => (
                  <ListItemTwo key={job.id} item={job} />
                ))}
              </div>

              <div
                className={`accordion-box grid-style ${
                  jobType === "grid" ? "show" : ""
                }`}
              >
                <div className="row">
                  {jobs?.map((job) => (
                    <div key={job.id} className="col-sm-6 mb-30">
                      <JobGridItem item={job} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
};

export default SearchItems;
