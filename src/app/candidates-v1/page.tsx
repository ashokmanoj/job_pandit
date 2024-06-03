import React from 'react';
import { Metadata } from 'next';
import Header from '@/layouts/headers/header-7';
import Wrapper from '@/layouts/wrapper';
import JobPortalIntro from '../components/job-portal-intro/job-portal-intro';
import CandidateV1Area from '../components/candidate/candidate-v1-area';
import FooterOne from '@/layouts/footers/footer-one';

export const metadata: Metadata = {
  title: "Candidate v1",
};


const CandidatePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        {/* <JobBreadcrumb title='Candidates' subtitle='Find you desire talents & make your work done' /> */}
        <div className="mt-30"></div>
        {/* search breadcrumb end */}

        {/* candidate area start */}
        <CandidateV1Area/>
        {/* candidate area end */}

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

export default CandidatePage;