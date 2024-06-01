import React, { useState } from "react";
import useFilterStore from "@/lib/store/filter";
import useCompanyFilterStore from "@/lib/store/company";


const JobCategory = ( {job_data,isCompany}: {job_data:any[],isCompany?:boolean}) => {
  const uniqueCategories = [
    ...new Set(job_data.flatMap((job) => job.category)),
  ];
  const [isShowMore, setIsShowMore] = useState(false);
  
  if(isCompany){

const { category,setCategory } = useCompanyFilterStore((state) => state);
    const visibleCategories = isShowMore
    ? uniqueCategories
    : uniqueCategories.slice(0, 5);
    return (
      <div className="main-body">
        <ul className="style-none filter-input">
          {visibleCategories.map((c, i) => (
            <li key={i}>
              <input
                onChange={() => setCategory(c)}
                type="checkbox"
                name={c}
                defaultValue={c}
                checked={category.includes(c)}
              />
              <label>
                {c}{" "}
                <span>
                  {job_data.filter((job) => job.category.includes(c)).length}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div
          onClick={() => setIsShowMore((prevState) => !prevState)}
          className="more-btn"
        >
          <i className="bi bi-dash"></i> Show {isShowMore ? "Less" : "More"}
        </div>
      </div>
    );
  }else{
    const visibleCategories = isShowMore
    ? uniqueCategories
    : uniqueCategories.slice(0, 5);
    const { category,setCategory } = useFilterStore((state) => state);
  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        {visibleCategories.map((c, i) => (
          <li key={i}>
            <input
              onChange={() => setCategory(c)}
              type="checkbox"
              name={c}
              defaultValue={c}
              checked={category.includes(c)}
            />
            <label>
              {c}{" "}
              <span>
                {job_data.filter((job) => job.category.includes(c)).length}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div
        onClick={() => setIsShowMore((prevState) => !prevState)}
        className="more-btn"
      >
        <i className="bi bi-dash"></i> Show {isShowMore ? "Less" : "More"}
      </div>
    </div>
  );
  }

  
};

export default JobCategory;
