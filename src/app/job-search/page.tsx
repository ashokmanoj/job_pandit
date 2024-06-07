import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import FooterOne from "@/layouts/footers/footer-one";
import JobBreadcrumb from "../components/jobs/breadcrumb/job-breadcrumb";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import SearchItemsCom from "../components/search-area/search-items";
import SearchItemsWrapper from "../components/search-area/SearchItemsWrapper";
import { assert } from "console";
import { fetchJobs } from "@/hooks/server-request/job_post";

export const metadata: Metadata = {
  title: "Search Page",
};

const SearchPage =async () => {
  const jobs = await fetchJobs();
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb job_data={jobs ||[]} />
        {/* search breadcrumb end */}

        {/* SearchItems start */}
        <SearchItemsWrapper all_jobs={jobs ||[]} />
        {/* SearchItems end */}

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

export default SearchPage;
