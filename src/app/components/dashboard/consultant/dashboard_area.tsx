"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import job_data from "@/data/job-data";
import icon_1 from "@/assets/dashboard/images/icon/icon_12.svg";
import icon_2 from "@/assets/dashboard/images/icon/icon_13.svg";
import icon_3 from "@/assets/dashboard/images/icon/icon_14.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_15.svg";
import DashboardHeader from "../candidate/dashboard-header";
import { CardItem } from "../candidate/dashboard-area";
import NiceSelect from "@/ui/nice-select";
import { useUserStore } from "@/lib/store/user";
import { fetchCompany } from "@/hooks/client-request/company";
import useSavedCandidateStore from "@/lib/store/savedCandidate";
import ConsultantGraph from "./ConsultantGraph";
import { fetchApplicationsByIds } from "@/hooks/client-request/application";
import processPostedJobsData from "@/hooks/funcs/ConsultantData";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const ConsultantDashboardArea = ({ setIsOpenSidebar }: IProps) => {
  const job_items = [...job_data.reverse().slice(0, 6)];
  const handleJobs = (item: { value: string; label: string }) => { };
  const { user } = useUserStore((state) => state);
  const [companyData, setCompanyData] = useState({} as any);
  const [myApplications, setMyApplications] = useState([] as any);
  const { savedCandidates } = useSavedCandidateStore();
  const [ data, setData ] = useState([] as any);

  useEffect(() => {
    if (user?.id) {
      fetchCompany({ id: user?.id }).then((data) => {
        setCompanyData(data.data);
        console.log(data.data.job_posts?.map((item: any) => item.id));
        if (data.data.job_posts?.map((item: any) => item.id).length > 0) {
          fetchApplicationsByIds(data.data.job_posts?.map((item: any) => item.id)).then((data) => {
            setMyApplications(data.data);
          })

        }
      });

    }
  }, [user]);

  function AppliedCandidates(id: string) {
    console.log(id, "id")
    console.log(myApplications.filter((a: any) => a.jobpost_id === id))
    return myApplications?.filter((a: any) => a.jobpost_id === id)
  }

  useEffect(() => {
    if(myApplications && companyData?.job_posts){
     
      const data = processPostedJobsData( companyData?.job_posts,myApplications);
      setData(data);

    }
  }, [myApplications,companyData.job_posts])
  console.log(myApplications,companyData?.job_posts,'Consultant Dash')
  console.log(companyData.vender_companies, 'vendor companies')


  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem img={icon_4} title="Posted Jobs" value={companyData?.job_posts?.length ? companyData?.job_posts?.length + "" : "0"} />
          <CardItem img={icon_2} title="Applications" value={myApplications?.length ? myApplications?.length + "" : "0"} />
          <CardItem img={icon_3} title="Vendor Companies" value={companyData.vender_companies?.length ? companyData.vender_companies?.length + "" : "0"} />
          <CardItem img={icon_1} title="Saved Candidates" value={savedCandidates?.length ? savedCandidates?.length + "" : "0"} />
        </div>

        <div className="row d-flex pt-50 lg-pt-10">
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <h4 className="dash-title-two">Week Activity</h4>
              {/* <div className="d-sm-flex align-items-center job-list">
                <div className="fw-500 pe-3">Jobs:</div>
                <div className="flex-fill xs-mt-10">
                  <NiceSelect
                    options={companyData?.job_posts?.length > 0 ? companyData?.job_posts.map((j: any) => ({
                    value: j.id,
                    label: j.title
                    })) : []}
                    defaultCurrent={0}
                    onChange={(item) => handleJobs(item)}
                    name="Search Jobs"
                    placeholder="Search Jobs"
                  />
                </div>
              </div> */}
              <div className="ps-5 pe-5 mt-50">
                <ConsultantGraph data={data} />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Posted Job</h4>
              <div className="wrapper">
                {companyData?.job_posts?.length > 0 ? companyData?.job_posts.map((j: any) => (
                  <div
                    key={j.id}
                    className="job-item-list d-flex align-items-center"
                  >
                    <div>
                      {j.company_logo ? <Image
                        src={j.company_logo ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${j.company_logo}` : "/assets/images/candidates/01.png"}
                        alt="logo"
                        width={40}
                        height={40}
                        className="lazy-img logo rounded-circle"
                        style={{ minWidth: "40px", height: "40px", objectFit: "cover", aspectRatio: "1/1", }}
                      /> : <Image
                        src={companyData.avatar?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${companyData.avatar}` : "/assets/images/candidates/01.png"}
                        alt="logo"
                        width={40}
                        height={40}
                        className="lazy-img logo rounded-circle"
                        style={{ minWidth: "40px", height: "40px", objectFit: "cover", aspectRatio: "1/1", }}
                      />}
                    </div>
                    <div className="job-title">
                      <h6 className="mb-5">
                        <a href="#">{j.title}</a>
                      </h6>
                      <div className="meta">
                        <a href="#" className=""> Applied Candidates: <span style={{ color: "green" }}>{" "}{AppliedCandidates(j.id).length}</span></a>
                      </div>
                    </div>

                    <div className="job-action">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            View Job
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Archive
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )) : <><p>No Jobs Posted</p></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboardArea;
