"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import CompanyReviews from './company-reviews';
import VideoPopup from '../common/video-popup';

const CompanyDetailsArea = ({ company }: { company: any }) => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  return (
    <>
      <section className="company-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-3 col-xl-4 order-xl-last">
              <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mb-50">
                <Image src={company?.avatar ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${company?.avatar}` : "/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle m-auto" style={{ objectFit: "cover", width: "auto", height: "auto" }} width={60} height={60} />

                <div className="text-md text-dark text-center mt-15 mb-20 lg-mb-10">{company?.company_name.charAt(0).toUpperCase().concat(company?.company_name.slice(1))}</div>
                <div className="text-center"><a href={company?.website} className="website-btn-two tran3s" target="_blank">Visit our website</a></div>

                <div className="border-top mt-35 lg-mt-20 pt-25">
                  <ul className="job-meta-data row style-none">
                    <li className="col-12">
                      <span>Location: </span>
                      <div>{company?.city.charAt(0).toUpperCase().concat(company?.city.slice(1))} ,{company?.state.charAt(0).toUpperCase().concat(company?.state.slice(1))}</div>
                    </li>
                    <li className="col-12">
                      <span>Size:</span>
                      <div>{company?.company_size}, Worldwide</div>
                    </li>
                    <li className="col-12">
                      <span>Email: </span>
                      <div><a href={`mailto:${company?.email}`}>{company?.email}</a></div>
                    </li>
                    <li className="col-12">
                      <span>Founded: </span>
                      <div>{new Date(company?.date).getFullYear()}</div>
                    </li>
                    <li className="col-12">
                      <span>Phone:</span>
                      <div><a href="#">{company?.phone_no}</a></div>
                    </li>
                    <li className="col-12">
                      <span>Sector: </span>
                      <div>{company.category}</div>
                    </li>
                    <li className="col-12">
                      <span>Social: </span>
                      <div>
                        {company?.social_links?.map((item: any, index: number) => {
                          return <a href={item.value} key={index} className="me-3">
                            <i className={item.label === "Linkedin" ? "bi bi-linkedin" : item.label === "Twitter" ? "bi bi-twitter" : item.label === "Instagram" ? "bi bi-instagram" : item.label === "Facebook" ? "bi bi-facebook" : item.label === "Github" ? "bi bi-github" : ''}></i>
                          </a>
                        })}
                      </div>
                    </li>
                  </ul>

                  <a href="#" className="btn-ten fw-500 text-white w-100 text-center tran3s mt-25">Send Message</a>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-8 order-xl-first">
              <div className="details-post-data me-xxl-5 pe-xxl-4">
                <h3>Overview</h3>
                <p>{company?.about}</p>
                <h3>Intro</h3>
                <div className="video-post d-flex align-items-center justify-content-center mb-50">
                  <a className="fancybox rounded-circle video-icon tran3s text-center"
                    onClick={() => setIsVideoOpen(true)} style={{ cursor: 'pointer' }}>
                    <i className="bi bi-play-fill"></i>
                  </a>
                </div>
                <div className="position-relative">
                  <h3>Company Reviews</h3>

                  {/* CompanyReviews */}
                  <CompanyReviews />
                  {/* CompanyReviews */}
                </div>

                <div className="share-option mt-60">
                  <ul className="style-none d-flex align-items-center">
                    <li className="fw-500 me-2">Share: </li>
                    <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                    <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                    <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* video modal start */}
      <VideoPopup isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'-6ZbrfSRWKc'} />
      {/* video modal end */}
    </>
  );
};

export default CompanyDetailsArea;