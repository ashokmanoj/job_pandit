import React from "react";
import Image from "next/image";
import Link from "next/link";

const CompanyListItem = ({ item }: { item: any }) => {
  return (
    <div
      className={`company-list-layout ${item.isFav ? "favourite" : ""} mb-20`}
    >
      <div className="row justify-content-between align-items-center">
        <div className="col-xl-5">
          <div className="d-flex align-items-xl-center">
            <Link href={`/company/${item?.id}`}
              className="company-logo rounded-circle"
            >
            <Image src={item?.avatar?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${item?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{objectFit:"cover", width:"60px", height:"60px", objectPosition:"center", aspectRatio:"1/1"}} width={60} height={60} />

            </Link>
            <div className="company-data">
              <h5 className="m0">
                <Link href={`/company/${item?.id}`} className="company-name tran3s">
                  {item.company_name.charAt(0).toUpperCase().concat(item?.company_name?.slice(1))}
                </Link>
              </h5>
              <p>{item?.city?.charAt(0).toUpperCase().concat(item?.city?.slice(1))}</p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-8">
          <div className="d-flex align-items-center ps-xxl-5 lg-mt-20">
            <div className="d-flex align-items-center">
              <div className="team-text">
                <span className="text-md fw-500 text-dark d-block">{item.job_posts?.map((item: any)=>item.vacancy).reduce((a: any, b: any) => a + b, 0)}</span>{" "}
                Vacancies
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-4">
          <div className="btn-group d-flex align-items-center justify-content-md-end lg-mt-20">
            <Link href={`/company/${item?.id}`}
              className="open-job-btn text-center fw-500 tran3s me-2"
            >
              {item.vacancy} open job
            </Link>
            <Link href={`/company/${item?.id}`}
              className="save-btn text-center rounded-circle tran3s"
              title="Save Job"
            >
              <i className="bi bi-bookmark-dash"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyListItem;
