import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header-7";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";
import CompanyV1Area from "../components/company/company-v1-area";
import { fetchCompanies } from "@/hooks/server-request/company";

export const metadata: Metadata = {
  title: "Company v1",
};

const CompanyV1Page = async () => {
  const companies = await fetchCompanies();
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}
        <div className="mt-30">
          
        </div>
        {/*breadcrumb start */}
        {/* <CompanyBreadcrumb title="Company" subtitle="Find your desire company and get your dream job" /> */}
        {/*breadcrumb end */}

        {/* company v1 area start */}
        <CompanyV1Area company_data={companies||[]} />
        {/* company v1 area end */}

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

export default CompanyV1Page;
