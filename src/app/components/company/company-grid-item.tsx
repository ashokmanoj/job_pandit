import React from "react";
import Image from "next/image";
import Link from "next/link";


const CompanyGridItem = ({ item }: { item: any }) => {

  return(
    <div
      className={`company-grid-layout ${item.isFav ? "favourite" : ""} mb-30`}
    >
      <Link href="/company-details"
        className="company-logo me-auto ms-auto rounded-circle"
      >
        <Image src={item?.avatar ?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${item?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{objectFit:"cover", width:"auto", height:"auto", maxWidth:"60px", maxHeight:"60px",aspectRatio:"1/1"}} width={60} height={60} />
      </Link>
      <h5 className="text-center">
        <Link href="/company-details" className="company-name tran3s">
          {item?.company_name.charAt(0).toUpperCase().concat(item?.company_name?.slice(1))}
        </Link>
      </h5>
      <p className="text-center mb-auto">{item?.city?.charAt(0).toUpperCase().concat(item?.city?.slice(1))}</p>
      <div className="bottom-line d-flex">
        <Link href="/company-details">{item?.job_posts?.map((item: any)=>item.vacancy).reduce((a: any, b: any) => a + b, 0)} Vacancy</Link>
        <Link href="/company-details">
          <i className="bi bi-bookmark-dash"></i> Save
        </Link>
      </div>
    </div>
  );
};

export default CompanyGridItem;
