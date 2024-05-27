import Header from "@/layouts/headers/header";
import FeatureOne from "./components/features/feature-one";
import HowItWorks from "./components/how-it-works/how-it-works";
import ExpertsOne from "./components/experts/experts-one";
import FeedbackOne from "./components/feedBacks/feedback-one";
import FeatureTwo from "./components/features/feature-two";
import BlogOne from "./components/blogs/blog-one";
import FancyBanner from "./components/fancy-banner/fancy-banner";
import JobPortalIntro from "./components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";
import Wrapper from "@/layouts/wrapper";
import CategorySectionSix from "./components/category/category-section-6";
import { JobListItems } from "./components/jobs/list/job-list-one";
import Link from "next/link";
import HeroBannerSix from "./components/hero-banners/hero-banner-six";




export default function Home() {
  
  return (
    <Wrapper>
      {/* header start */}
      <Header/>
      {/* header end */}
      {/* hero banner start */}
        {/* <HeroBannerFour /> */}
        <HeroBannerSix />
      {/* hero banner end */}
      {/* category section start */}
      <CategorySectionSix/>
      {/* category section end */}
   {/* job list items start */}
   <section className="job-listing-one mt-160 lg-mt-100 sm-mt-80">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6">
                <div className="title-one">
                  <h2 className="main-font color-blue wow fadeInUp" data-wow-delay="0.3s">New job listing</h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="d-flex justify-content-lg-end">
                  <Link href="/job-list-v1" className="btn-six d-none d-lg-inline-block">Explore all jobs
                  </Link>
                </div>
              </div>
            </div>
            <div className="job-listing-wrapper mt-60 md-mt-40 wow fadeInUp">
              <JobListItems style_2={true} />
            </div>
            <div className="text-center mt-40 d-lg-none">
              <Link href="/job-list-v1" className="btn-six">Explore all jobs</Link>
            </div>
            <div className="text-center mt-50 wow fadeInUp">
              <div className="btn-eight fw-500">Do you want to post a job for your company? <span>We can help.</span> <Link href="/register">Click here</Link></div>
            </div>
          </div>
        </section>
        {/* job list items end */}
      {/* feature one start */}
      <FeatureOne/>
      {/* feature one end */}

      {/* how works start */}
      <HowItWorks/>
      {/* how works end */}

      {/* expert one section start */}
      <ExpertsOne/>
      {/* expert one section end */}

      {/* feedback one start */}
      <FeedbackOne/>
      {/* feedback one end */}

      {/* text feature two start */}
      <FeatureTwo/>
      {/* text feature two end */}

      {/* blog section one start */}
      <BlogOne/>
      {/* blog section one end */}

      {/* fancy banner start */}
      <FancyBanner/>
      {/* fancy banner end */}

      {/* job portal intro start */}
      <JobPortalIntro/>
      {/* job portal intro end */}

      {/* footer start */}
      <FooterOne/>
      {/* footer end */}
    </Wrapper>
  );
}
