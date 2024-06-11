"use client";
import React,{useEffect, useRef} from "react";
import Slider from "react-slick";
import JobGridItem from "./grid/job-grid-item";
import { fetchJobs } from "@/hooks/client-request/job";
import JobListTwo from "./list/job-list-two";
import ListItem from "./list/list-item";

// slider setting
const slider_setting = {
  dots: false,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const RelatedJobs = ({category}:{category:string[]}) => {
  useEffect(() => {

    fetchJobs().then((data:any) => {
      setJobs(data);
    })
  })
  const [jobs, setJobs] = React.useState<any[]>([]);
  const job_items = jobs.filter((job:any) => {
    return category === job.category;
  });;
  const sliderRef = useRef<Slider | null>(null);

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };
  return (
    <section className="related-job-section pt-90 lg-pt-70 pb-120 lg-pb-70">
      <div className="container">
        <div className="position-relative">
          <div className="title-three text-center text-md-start mb-55 lg-mb-40">
            <h2 className="main-font">Related Jobs</h2>
          </div>

          <Slider {...slider_setting} ref={sliderRef}   className="related-job-slider">
            {job_items.map((j:any) => (
              <div key={j.id} className="item">
                <JobGridItem item={j} />   
              </div>
            ))}
          </Slider>

          <ul className="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-20">
            <li onClick={sliderPrev} className="prev_e slick-arrow">
              <i className="bi bi-arrow-left"></i>
            </li>
            <li onClick={sliderNext} className="next_e slick-arrow">
              <i className="bi bi-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RelatedJobs;
