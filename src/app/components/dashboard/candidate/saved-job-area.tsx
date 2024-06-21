'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import ActionDropdown from "./action-dropdown";
import useWishlistStore from "@/lib/store/wishlist";
import formatAmount from "@/hooks/funcs/formateAmount";
import Pagination from "@/ui/pagination";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedJobArea = ({setIsOpenSidebar}:IProps) => {
  const { wishlist, add_to_wishlist,remove_wishlist_product} = useWishlistStore();
  const job_items = wishlist;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 6) % job_items.length;
    setItemOffset(newOffset);
  };
  
 
 
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Job</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div>
        </div>

        <div className="wrapper">
          {job_items.length > 0 ? job_items.map((j) => (
            <div
              key={j.id}
              className="job-list-one style-two position-relative mb-20"
            >
              <div className="row justify-content-between align-items-center">
                <div className="col-xxl-3 col-lg-4">
                  <div className="job-title d-flex align-items-center">
                    <a href="#" className="logo">
                    <Image src={j?.company?.avatar ?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${j.company?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle m-auto" style={{objectFit:"cover", width:"auto", height:"auto"}} width={60} height={60} />
                    </a>
                    <a href="#" className="title fw-500 tran3s">
                      {j.title}
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                  <Link href={`/job-details/${j.id}`}
                    className={`job-duration fw-500 ${
                      j.job_type === "Part time" ? "part-time" : ""
                    }`}
                  >
                    {j.job_type}
                  </Link>
                  <div className="job-salary">
                  <span className="fw-500 text-dark">₹ {formatAmount(j.min_salary)}-{formatAmount(j.max_salary)}/{j.salary_type} <br /><span className="text-success">{j.experience==="Fresher"?"Fresher":"Experienced"}</span></span>
                  </div>
                </div>
                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                  <div className="job-location">
                    <a href="#">{j.location}</a>
                  </div>
                  <div className="job-category">
                   
                      <a href="#">
                        
                        <span>{j.category}</span>
                      </a>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="action-dots float-end">
                    <button
                      className="action-btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span></span>
                    </button>
                    {/* action dropdown start */}
                    <ActionDropdown j={j}  remove_wishlist_product={remove_wishlist_product}/>
                    {/* action dropdown end */}
                  </div>
                </div>
              </div>
            </div>
          )):<div className="text-center">
          <h3 className="main-title m0">No Saved Jobs</h3>
          <p className="mb-0">You haven't saved any job yet</p>
          <Link style={{color:"#005025",textDecoration:"underline"}} href="/job">Find  Jobs Here.</Link>
        </div>}
        </div>
        
        
      </div>
    </div>
  );
};

export default SavedJobArea;
