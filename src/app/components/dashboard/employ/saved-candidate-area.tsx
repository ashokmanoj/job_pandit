"use client"
import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import CandidateItem from "./candidate-item";
import EmployShortSelect from "./short-select";
import useSavedCandidateStore from "@/lib/store/savedCandidate";
import Link from "next/link";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedCandidateArea = ({setIsOpenSidebar}:IProps) => {
  const {savedCandidates:candidate_data} = useSavedCandidateStore();
  const candidate_items = candidate_data.slice(0, 4);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Candidate</h2>
          
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <EmployShortSelect/>
          </div>
        </div>
        <div style={{height:"2px" ,width:"100%", backgroundColor:"rgba(0, 0, 0, 0.1)",marginBottom:"20px"}}> </div>
        <div className="wrapper">
          {candidate_items.length > 0 ? candidate_items?.map((item) => (
            <CandidateItem key={item.id} item={item} />
          )):
          <div className="text-center">
            <h3 className="main-title m0">No Saved Candidate</h3>
            <p className="mb-0">You haven't saved any candidate yet</p>
            <Link style={{color:"#005025",textDecoration:"underline"}} href="/candidate">Find  Candidates Here.</Link>
          </div>
          }
        </div>

        
      </div>
    </div>
  );
};

export default SavedCandidateArea;

