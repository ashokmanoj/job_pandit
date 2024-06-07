"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import useWishlistStore from "@/lib/store/wishlist";
import formatAmount from "@/hooks/funcs/formateAmount";


const ListItemTwo = ({ item }: { item: any }) => {
  const {wishlist,add_to_wishlist} = useWishlistStore((state) => state);
  const isActive = wishlist.some(p => p.id === item.id);

  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    add_to_wishlist(item)
  };
  return (
    <div className="job-list-one style-two position-relative border-style mb-20">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-5">
          <div className="job-title d-flex align-items-center ">
            <Link href={`/job/${item.id}`} className="logo">
            <Image src={item?.avatar?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${item?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{objectFit:"cover", width:"auto", height:"auto",aspectRatio:"1/1"}} width={60} height={60} />
            </Link>
            <div className="split-box1">
              <Link
                href={`/job/${item.id}`}
                className="job-duration fw-500"
              >
                {item.job_type}
              </Link>
              <Link
                href={`/job/${item.id}`}
                className="title fw-500 tran3s"
              >
                {item.title.slice(0, 22)} {item.title.length > 20 ? ".." : ""}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="job-location">
            <Link href={`/job/${item.id}`}>{item.location}</Link>
          </div>
          <div className="job-salary">
            <span className="fw-500 text-dark">₹{formatAmount(item.min_salary)}-{formatAmount(item.max_salary)}/{item.salary_type} <br /><span className="text-success">{item.experience==="Fresher"?"Fresher":"Experienced"}</span></span>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
            <a
              onClick={() => handleAddWishlist(item)}
              className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${isActive?'active':''}`}
              title={`${isActive?'Remove Job':'Save Job'}`}
            >
              <i className="bi bi-bookmark-dash"></i>
            </a>
            <Link
              href={`/job/${item.id}`}
              className="apply-btn text-center tran3s"
            >
              APPLY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemTwo;
