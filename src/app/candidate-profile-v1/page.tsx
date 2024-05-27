import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import CandidateProfileBreadcrumb from "../components/candidate-details/profile-bredcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import CandidateDetailsArea from "../components/candidate-details/candidate-details-area";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Candidate Details v1",
};

const CandidateProfileDetailsPage = async () => {
 
const fetchData = async () => {
  const supabase = createClient();
  const {data,error} = await supabase.auth.getUser();
   

  return data?.user?.id
}

  const userId = await fetchData();
  console.log(userId)

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumb title="Candidate Profile" subtitle="Candidate Profile" />
        {/* breadcrumb end */}

        {/* candidate details area start */}
        <CandidateDetailsArea candidateId={userId||''} />
        {/* candidate details area end */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CandidateProfileDetailsPage;
