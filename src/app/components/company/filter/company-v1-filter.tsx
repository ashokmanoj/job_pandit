import React from "react";
import FilterCompanyLocation from "./filter-company-location";
import useCompanyFilterStore from "@/lib/store/company";
import JobCategory from "../../jobs/filter/job-category";

const CompanyV1Filter = ({ company_data }: { company_data: any[] }) => {
  const { resetFilter } = useCompanyFilterStore((state) => state);
  const handleReset = () => {
    resetFilter()
  }
  return (
    <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
      <div className="filter-block bottom-line pb-25">
        <a
          className="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseSemploye"
          role="button"
          aria-expanded="false"
        >
          Search Company
        </a>
        <div className="collapse show" id="collapseSemploye">
          <div className="main-body">
            <form action="#" className="input-box position-relative">
              <input type="text" placeholder="Company Name" />
              <button>
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      

      <div className="filter-block bottom-line pb-25 mt-25">
        <a
          className="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseLocation"
          role="button"
          aria-expanded="false"
        >
          Location
        </a>
        <div className="collapse show" id="collapseLocation">
          <div className="main-body">
            <FilterCompanyLocation company_data={company_data} />
          </div>
        </div>
      </div>
      <div className="filter-block bottom-line pb-25 mt-25">
        <a className="filter-title fw-500 text-dark collapsed" data-bs-toggle="collapse" href="#collapseCategory" role="button" aria-expanded="false">Category</a>
        <div className="collapse" id="collapseCategory">
          <JobCategory job_data={company_data} isCompany={true} />
        </div>
      </div>
      
      
      <button
        onClick={handleReset}
        className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default CompanyV1Filter;
