"use client";
import React, { useEffect, useState } from "react";
import CompanyV1Filter from "./filter/company-v1-filter";
import ShortSelect from "../common/short-select";
import CompanyGridItem from "./company-grid-item";
import CompanyListItem from "./company-list-item";
import CompanyPagination from "./company-pagination";
import useCompanyFilterStore from "@/lib/store/company";
import slugify from "slugify";
import Pagination from "@/ui/pagination";


const CompanyV1Area = ({ style_2 = false,company_data }: { style_2?: boolean ,company_data: any[]}) => {
  const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");
  console.log(company_data,"company_data");
  const { category, location,company_type} = useCompanyFilterStore((state) => state);
  const [currentItems, setCurrentItems] = useState<any[] | null>(null);
  const [filterItems, setFilterItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [shortValue, setShortValue] = useState('');

  useEffect(() => {
    // Filter the job_data array based on the selected filters
    let filteredData = company_data
     
      .filter((item) => (company_type ? item.company_Type === company_type : true))
      .filter((l) => location ? slugify(l.city.split(',').join('-').toLowerCase(),'-') === location : true)
      .filter((item)=>(category?item.category === category : true))
      

      // if (shortValue === 'price-low-to-high') {
      //   filteredData = filteredData.slice()
      //     .sort((a, b) => Number(a.max_salary) - Number(b.max_salary) || Number(a.max_salary) - Number(b.max_salary))
      // }
    
      // if (shortValue === 'price-high-to-low') {
      //   filteredData = filteredData.slice()
      //     .sort((a, b) => Number(b.max_salary) - Number(a.max_salary));
      // }
    const endOffset = itemOffset + 8;
    setFilterItems(filteredData)
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredData.length / 8));
  }, [
    itemOffset,
    category,
    company_type,
    location,
    shortValue
  ]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 8) % company_data.length;
    setItemOffset(newOffset);
  };
  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value)
  }
  return (
    <section className="company-profiles pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <button
              type="button"
              className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
              data-bs-toggle="offcanvas"
              data-bs-target="#filteroffcanvas"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>
            <div
              className="filter-area-tab offcanvas offcanvas-start"
              id="filteroffcanvas"
            >
              <button
                type="button"
                className="btn-close text-reset d-lg-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
              <div className="main-title fw-500 text-dark">Filter By</div>
              {/* CompanyV1Filter */}
              <CompanyV1Filter company_data={company_data} />
              {/* CompanyV1Filter */}
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="ms-xxl-5 ms-xl-3">
              <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                <div className="total-job-found">
                  All <span className="text-dark fw-500">{company_data.length}</span> company
                  found
                </div>
                <div className="d-flex align-items-center">
                  <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Short:</div>
                    <ShortSelect />
                  </div>
                  <button
                    onClick={() => setJobType("list")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${jobType === "grid" ? "active" : ""}`}
                    title="Active List"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <button
                    onClick={() => setJobType("grid")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${jobType === "list" ? "active" : ""}`}
                    title="Active Grid"
                  >
                    <i className="bi bi-grid"></i>
                  </button>
                </div>
              </div>

              <div
                className={`accordion-box grid-style ${jobType === "grid" ? "show" : ""}`}
              >
                <div className="row">
                  {company_data.slice(0,9).map((item) => (
                    <div
                      key={item.id}
                      className="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex"
                    >
                      <CompanyGridItem item={item} />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`accordion-box list-style ${jobType === "list" ? "show" : ""}`}
              >
                {company_data.slice(0,9).map((item) => (
                  <CompanyListItem key={item.id} item={item} />
                ))}
              </div>

              {/* <div className="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                  Showing <span className="text-dark fw-500">1 to 20</span> of{" "}
                  <span className="text-dark fw-500">350</span>
                </p>
                <CompanyPagination/>
              </div> */}
              {currentItems && (
                <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing{" "}
                    <span className="text-dark fw-500">{itemOffset + 1}</span>{" "}
                    to{" "}
                    <span className="text-dark fw-500">
                      {Math.min(itemOffset + 8, currentItems.length)}
                    </span>{" "}
                    of{" "}
                    <span className="text-dark fw-500">{filterItems.length}</span>
                  </p>
                  {filterItems.length > 8 && (
                    <Pagination
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyV1Area;
