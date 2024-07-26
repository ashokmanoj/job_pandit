"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import icon_1 from "@/assets/dashboard/images/icon/icon_6.svg";
import icon_2 from "@/assets/images/icon/icon_07.svg";
import icon_3 from "@/assets/dashboard/images/icon/heart-alt-svgrepo-com.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_31.svg";
import DashboardHeader from "./dashboard-header";
import { fetchCandidatesDash } from "@/hooks/client-request/candidate";
import { useUserStore } from "@/lib/store/user";
import useSavedCandidateStore from "@/lib/store/savedCandidate";
import { fetchMyAppliedJobsByIds } from "@/hooks/client-request/job";
import CandidateGraph from "./CandidateProfile";
import { fetchLikes } from "@/hooks/client-request/likes";
import processLikesData from "@/hooks/funcs/CandidateData";
import useWishlistStore from "@/lib/store/wishlist";

// card item
export function CardItem({
  img,
  value,
  title,
}: {
  img: StaticImageData;
  value: string;
  title: string;
}) {
  return (
    <div className="col-lg-3 col-6">
      <div className="dash-card-one bg-white border-30 position-relative mb-15">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
            <Image src={img} alt="icon" className="lazy-img" />
          </div>
          <div className="order-sm-0">
            <div className="value fw-500">{value}</div>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardArea = ({ setIsOpenSidebar }: IProps) => {
  const { user } = useUserStore();
  const [candidateData, setCandidateData] = useState({} as any);
  const { savedCandidates } = useSavedCandidateStore();
  const [appliedJobs, setAppliedJobs] = useState([] as any);
  const [likedData, setLikedData] = useState([] as any);
  const [data, setData] = useState([] as any);
  const { wishlist } = useWishlistStore();

  useEffect(() => {
    function fetchData(user_id: string) {
      fetchCandidatesDash(user_id).then((data) => {
        setCandidateData(data);
        fetchMyAppliedJobsByIds(data.job_applications.map((j: any) => j.jobpost_id)).then((data) => {
          setAppliedJobs(data.data);
        });
      });
    }

    if (user?.id) {
      fetchData(user.id);
      fetchLikes(user.id).then(({ data }) => {
        setLikedData(data);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log(candidateData.job_applications, likedData, "candidateData and likedData");
    if (candidateData.job_applications && likedData) {
      const data = processLikesData(likedData, candidateData?.job_applications);
      console.log(data, "data");
      setData(data);
    }
  }, [candidateData.job_applications, likedData]);

  const pendingApplicationsCount = candidateData?.job_applications?.filter((app: any) => app.status === "Pending").length || 0;
  const shortlistedApplicationsCount = candidateData?.job_applications?.filter((app: any) => app.status === "Shortlisted").length || 0;

  console.log(candidateData, appliedJobs, likedData, "candidateData and appliedJobs");

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem img={icon_4} title="Applied Jobs" value={candidateData?.job_applications?.length ? candidateData?.job_applications?.length + "" : "0"} />
          {/* <CardItem img={icon_2} title="Pending Applications" value={pendingApplicationsCount + ""} /> */}
          <CardItem img={icon_2} title="Shortlisted" value={shortlistedApplicationsCount + ""} />
          <CardItem img={icon_3} title="Profile Likes" value={likedData?.length + ''} />
          <CardItem img={icon_1} title="Saved Jobs" value={wishlist?.length + ''} />
        </div>

        <div className="row d-flex pt-50 lg-pt-10">
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <h4 className="dash-title-two">Profile Views</h4>
              <div className="ps-5 pe-5 mt-50">
                <CandidateGraph data={data} />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Recent Applied Jobs</h4>
              <div className="wrapper">
                {appliedJobs.length > 0 ? appliedJobs?.map((j: any) => (
                  <div
                    key={j.id}
                    className="job-item-list d-flex align-items-center"
                  >
                    <div>
                      <Image
                        src={j.company_logo ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${j.company_logo}` : "/assets/images/candidates/01.png"}
                        alt="logo"
                        width={40}
                        height={40}
                        className="lazy-img logo rounded-circle"
                        style={{ minWidth: "40px", height: "40px", objectFit: "cover", aspectRatio: "1/1", }}
                      />
                    </div>
                    <div className="job-title">
                      <h6 className="mb-5">
                        <a href={`/job/${j.id}`}>{j.title}</a>
                      </h6>
                      <div className="meta">
                        <span>{j.location}</span>.<span>{j.job_type}</span>
                      </div>
                    </div>
                    {candidateData?.job_applications.map((job: any) => {
                      if (job.jobpost_id === j.id) return <a key={job.id} href={`/job/${j.id}`} className="meta" style={{ whiteSpace: "nowrap", backgroundColor: job.status === "Shortlisted" ? "lightgreen" : job.status === "Rejected" ? "red" : "gray", color: "white", fontSize: "10px", padding: "2px 5px", borderRadius: "5px" }}>{job.status}</a>
                    })}
                  </div>
                )) : <p>No Jobs Applied</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardArea;
