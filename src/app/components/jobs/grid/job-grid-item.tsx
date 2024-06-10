'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import useWishlistStore from "@/lib/store/wishlist";
import formatAmount from "@/hooks/funcs/formateAmount";


const JobGridItem = ({ item, style_2 = true }: { item: any; style_2?: boolean }) => {

  const { wishlist, add_to_wishlist } = useWishlistStore((state) => state);
  const isActive = wishlist.some(p => p.id === item.id);
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    add_to_wishlist(item)
  };
  return (
    <div className={`job-list-two ${style_2 ? 'style-two' : ''} position-relative`}>
      <Link href={`/job-details/${item.id}`} className="logo">
        
          <Image src={item?.company_logo!==null?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${item?.company_logo}`: item.company.avatar?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${item?.company.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{ objectFit: "cover", width: "45px", height: "auto", aspectRatio: "1/1" }} width={60} height={60} /> 



      </Link>
      <a onClick={() => handleAddWishlist(item)}
        className={`save-btn text-center rounded-circle tran3s cursor-pointer ${isActive ? 'active' : ''}`}
        title={`${isActive ? 'Remove Job' : 'Save Job'}`}
      >
        <i className="bi bi-bookmark-dash"></i>
      </a>
      <div>
        <Link href={`/job-details/${item.id}`}
          className={`job-duration fw-500 ${item.job_type === "Part time" ? "part-time" : ""}`}
        >
          {item.job_type}
        </Link>
      </div>
      <div>
        <Link href={`/job-details/${item.id}`} className="title fw-500 tran3s">
          {item.title}
        </Link>
      </div>
      <div className="job-salary">
        <span className="fw-500 text-dark">₹ {formatAmount(item.min_salary)}-{formatAmount(item.max_salary)}/{item.salary_type}</span>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="job-location">
          <Link href={`/job-details/${item.id}`}>{item.location}</Link>
        </div>
        <Link href={`/job-details/${item.id}`} className="apply-btn text-center tran3s">
          APPLY
        </Link>
      </div>
    </div>
  );
};

export default JobGridItem;
