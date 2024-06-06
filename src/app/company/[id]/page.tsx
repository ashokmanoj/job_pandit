import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header-7";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../../components/job-portal-intro/job-portal-intro";
import CompanyBreadcrumb from "../../components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import CompanyDetailsArea from "../../components/company-details/company-details-area";
import OpenPosition from "../../components/company-details/open-position";
import { fetchCompany } from "@/hooks/server-request/company";

export const metadata: Metadata = {
  title: "Company Details",
};

const CompanyDetailsPage = async ({ params }: { params: { id: number } }) => {
  const company = await fetchCompany(params.id);
  console.log(company);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}
        <div className="mt-30"></div>
        {/*breadcrumb start */}
        {/* <CompanyBreadcrumb
          title="Company Details"
          subtitle="Find company details here"
        /> */}
        {/*breadcrumb end */}

        {/* company details area start */}
        <CompanyDetailsArea company={company} />
        {/* company details area end */}

        {/*job Open Position */}
        <OpenPosition job_data={company?.job_posts} />
        {/*job Open Position */}

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

export default CompanyDetailsPage;
