"use client"
import Slider from "react-slick";
import React, { useRef } from "react";
import logo_1 from "@/assets/images/logo/media_01.png";
import logo_2 from "@/assets/images/logo/media_06.png";
import logo_3 from "@/assets/images/logo/media_07.png";
import logo_white_1 from "@/assets/images/logo/media_27.png";
import logo_white_2 from "@/assets/images/logo/media_28.png";
import logo_white_3 from "@/assets/images/logo/media_29.png";
import Image, { StaticImageData } from "next/image";
import PartnersSlider from "../partners/partners-slider";
import { auto } from "@popperjs/core";

// slider_setting
const slider_setting = {
  dots: false,
  arrows: false,
  with: auto,
  hight:auto,
  centerPadding: "0px",
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// feedback data
const feedback_data: {
  id: number;
  logo: StaticImageData;
  title: any;
  name: string;
  user_title: string;
  rating: number;
  rating_text: string;
  white_logo: StaticImageData;
}[] = [
    {
      id: 1,
      logo: logo_1,
      title:<h3>“We've seen a significant improvement in our recruitment process since partnering with JobPandit. Their platform is user-friendly, and the quality of candidates has been exceptional.”</h3>,
      name: "John Doe",
      user_title: "Head of Human Resources, Bigleap Innovators Inc.",
      rating: 4.5,
      rating_text: "Excellent",
      white_logo: logo_white_1,
    },
    {
      id: 2,
      logo: logo_2,
      title:
        <h3>“Thanks to JobPandit, we've managed to fill our open positions with top-tier candidates in record time. Their advanced search features and detailed analytics have been incredibly valuable.”</h3>,
      name: "Michael Johnson",
      user_title: "Recruitment Director",
      rating: 4.7,
      rating_text: "Awesome",
      white_logo: logo_white_2,
    },
    {
      id: 3,
      logo: logo_3,
      title:<h3>“JobPandit has been instrumental in helping us attract high-quality candidates. The platform's ease of use and the support from their team have been outstanding. Our hiring process is now more efficient and effective.”</h3>,
      name: "Emily Brown",
      user_title: "Chief Operating Officer",
      rating: 4.8,
      rating_text: "Excellent",
      white_logo: logo_white_3,
    },
  ];
const FeedbackOne = ({ style_2 = false, style_3 = false, about_p = false }: { style_2?: boolean; style_3?: boolean; about_p?: boolean }) => {
  const sliderRef = useRef<Slider | null>(null);

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };
  return (
    <section className={`feedback-section-one ${style_3 ? 'pt-120 lg-pt-100' : 'pt-180 xl-pt-150 lg-pt-100'} ${about_p ? 'pb-80 lg-pb-20' : ''}`}>
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-7 col-md-6">
            <div className="title-one text-center text-md-start mb-65 md-mb-50 wow fadeInUp" data-wow-delay="0.3s">
              <h2 className={style_3 ? 'main-font' : ''}>Valued by the most innovative companies.</h2>
            </div>
          </div>
        </div>

        <Slider
          {...slider_setting}
          className="row feedback-slider-one"
          ref={sliderRef}
        >
          {feedback_data.map((item) => (
            <div key={item.id} className="item">
              <div className={`feedback-block-one ${style_2 ? 'color-two' : ''}`}>
                <div className="logo">
                  <Image src={style_2 ? item.white_logo : item.logo} style={{height:'auto',width:'auto',objectFit:'cover'}} alt="logo" />
                </div>
                <blockquote className={`fw-500 mt-50 md-mt-30 mb-50 md-mb-30 ${style_2 ? 'text-white' : ''}`}>
                  {item.title}
                </blockquote>
                <div className={`name ${style_2 ? 'text-white' : 'text-dark'}`}>
                  <span className="fw-500">{item.name},</span>
                  {item.user_title}
                </div>
                <div className="review pt-40 md-pt-20 mt-40 md-mt-30 d-flex justify-content-between align-items-center">
                  <div className={`text-md fw-500 ${style_2 ? 'text-white' : 'text-dark'}`}>
                    {item.rating} {item.rating_text}
                  </div>
                  <ul className="style-none d-flex">
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <ul className="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30">
          <li className="prev_b slick-arrow" onClick={sliderPrev}>
            <i className="bi bi-arrow-left"></i>
          </li>
          <li className="next_b slick-arrow" onClick={sliderNext}>
            <i className="bi bi-arrow-right"></i>
          </li>
        </ul>

        {!style_2 && <div className={`partner-logos ${about_p ? 'border-0' : ''} pt-150 xl-pt-120 md-pt-80 sm-pt-40 pb-80 md-pb-40`}>
          {/* partners slider start */}
          <PartnersSlider />
          {/* partners slider end */}
        </div>}
      </div>
    </section>
  );
};

export default FeedbackOne;
