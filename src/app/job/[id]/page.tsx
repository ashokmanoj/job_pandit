import React from "react";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header-7";
import JobDetailsV1Area from "@/app/components/job-details/job-details-v1-area";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "@/app/components/jobs/breadcrumb/job-details-breadcrumb";
import RelatedJobs from "@/app/components/jobs/related-jobs";
import FooterOne from "@/layouts/footers/footer-one";
import job_data from "@/data/job-data";
import { fetchJob } from "@/hooks/server-request/job_post";
import ErrorPageArea from "@/app/components/error/error-page-area";

const JobDetailsDynamicPage = async ({ params }: { params: { id: string } }) => {
  const job = await fetchJob(Number(params.id));
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}
        <div className="mt-30"></div>
        {/* job details breadcrumb start */}
        {/* <JobDetailsBreadcrumb /> */}
        {/* job details breadcrumb end */}

        {/* job details area start */}
        {job ? <JobDetailsV1Area job={job} /> : <><ErrorPageArea title="Job Not Found" /></>}
        {/* job details area end */}

        {/* related job start */}
        {job && <RelatedJobs category={job.category} />}
        {/* related job end */}

        {/* job portal intro start */}
        <JobPortalIntro />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobDetailsDynamicPage;
