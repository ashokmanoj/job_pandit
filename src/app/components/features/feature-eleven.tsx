"use client"
import React, { useState } from 'react';
import AccordionItem from '../accordion/accordion-item';
import VideoPopup from '../common/video-popup';
import CounterOne from '../counter/counter-one';

const FeatureEleven = () => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  return (
    <>
      <section className="text-feature-three position-relative pt-100 lg-pt-80 md-pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-11 m-auto">
              <div className="row">
                <div className="col-lg-5">
                  <div className="title-one mt-30 md-mb-40">
                    <h2 className="fw-500">We’ve been helping customer globally.</h2>
                  </div>
                </div>
                <div className="col-lg-6 ms-auto">
                  <div className="wow fadeInRight">
                    <div className="accordion accordion-style-one color-two ps-xxl-5 ms-xxl-4" id="accordionOne">
                      <AccordionItem id='one' isShow={true} title='Who we are?' desc='We are a job portal website, dedicated to helping job seekers and employers connect.' parent='accordionOne' />
                      <AccordionItem id='two' title='What’s our goal' desc='Our goal is to make the job search process easier and more efficient for everyone involved.' parent='accordionOne' />
                      <AccordionItem id='three' title='Our vision' desc='Our vision is to create a job market that is transparent and equitable, where everyone has access to the best opportunities.' parent='accordionOne' />
                    </div>
                  </div>
                </div>
              </div>

              <div className="video-post d-flex align-items-center justify-content-center mt-100 lg-mt-50 mb-50 lg-mb-30">
                <a onClick={() => setIsVideoOpen(true)} className="fancybox rounded-circle video-icon tran3s text-center cursor-pointer">
                  <i className="bi bi-play"></i>
                </a>
              </div>
              <div className="border-bottom pb-50 lg-pb-10">
                <div className="row">
                  {/* counter */}
                  <CounterOne style_3={true} />
                  {/* counter */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* video modal start */}
      <VideoPopup isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'comming soon'} />
      {/* video modal end */}
    </>
  );
};

export default FeatureEleven;