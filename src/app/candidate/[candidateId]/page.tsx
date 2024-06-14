import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../../components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";
import CandidateDetailsArea from "../../components/candidate-details/candidate-details-area";
import CandidateProfileBreadcrumbTwo from "@/app/components/candidate-details/breadcrumb-2";
import { fetchCandidate } from "@/hooks/server-request/candidate";
import ErrorPageArea from "@/app/components/error/error-page-area";
import Header7 from "@/layouts/headers/header-7";


export const metadata: Metadata = {
  title: "Candidate Details v1",
};

const CandidateProfileDetailsPage = async ({ params }: { params: { candidateId: string } }) => {

  const candidate = await fetchCandidate({ candidateId: params.candidateId });
  console.log(candidate);

  if (!candidate.profile ) {
    return (
      <Wrapper>
        <div className="main-page-wrapper">
          {/* header start */}
          <Header7 />
          {/* header end */}
          <div className="mt-30"></div>
          <ErrorPageArea title="Candidate Not Found" />
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumbTwo candidate={candidate} />
        {/* breadcrumb end */}

        {/* candidate details area start */}
        <CandidateDetailsArea candidate={candidate} />
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
