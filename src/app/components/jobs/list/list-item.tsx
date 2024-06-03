'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useWishlistStore from "@/lib/store/wishlist";


const ListItem = ({ item,style_2,cls='' }: { item: any;style_2?:boolean;cls?:string }) => {
  
  const {wishlist,add_to_wishlist} = useWishlistStore((state) => state);
  const isActive = wishlist.some(p => p.id === item.id);

  // handle add wishlist
  const handleAddWishlist = (item: any) => {
    add_to_wishlist(item)
  };
  return (
    <div className={`job-list-one position-relative ${cls} ${style_2?'border-style mb-20':'bottom-border'}`}>
      <div className="row justify-content-between align-items-center">
        <div className="col-xxl-3 col-lg-4">
          <div className="job-title d-flex align-items-center">
            <Link href={`/job-details/${item.id}`} className="logo">
            <Image src={item?.company?.avatar ?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${item.company?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{objectFit:"cover", width:"auto", height:"auto"}} width={60} height={60} />
            </Link>
            <Link href={`/job-details/${item.id}`} className="title fw-500 tran3s">
              {item.title}
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
          <Link href={`/job-details/${item.id}`}
            className={`job-duration fw-500 ${item.job_type === "Part time" ? "part-time" : ""}`}
          >
            {item.job_type}
          </Link>
          <div className="job-date">
            {new Date(item?.created_at).toDateString()} by <Link href={`/job-details/${item.id}`}>{item.company.company_name}</Link>
          </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
          <div className="job-location">
            <Link href={`/job-details/${item.id}`}>{item.location}</Link>
          </div>
          <div className="job-category">
              <a href="#">
                {item.category}
              </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-4">
          <div className="btn-group d-flex align-items-center justify-content-md-end sm-mt-20">
            <a onClick={() => handleAddWishlist(item)}
              className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${isActive?'active':''}`}
              title={`${isActive?'Remove Job':'Save Job'}`}
            >
              <i className="bi bi-bookmark-dash"></i>
            </a>
            <Link href={`/job-details/${item.id}`}
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

export default ListItem;
