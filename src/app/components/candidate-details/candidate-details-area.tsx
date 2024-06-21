
import React from 'react';
import Image from 'next/image';
import Skills from './skills';
import WorkExperience from './work-experience';
import CandidateBio from './bio';
import VideoPlayer from './videoPlayer';
import Projects from './projects';
import ErrorPageArea from '../error/error-page-area';
import Achievements from './achievements';
import AchievementsModel from '../common/popup/achivements';




const CandidateDetailsArea = ({ candidate }: { candidate: any }) => {


  return (
    <>
      {candidate.profile.overview ? <section className="candidates-profile pt-100 lg-pt-70 pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-lg-8">
              <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
              <div className="inner-card border-style mb-65 lg-mb-40">
                  <h3 className="title">Bio</h3>
                  <p>{candidate.profile?.bio}</p>
                </div>
                <div className="inner-card border-style mb-65 lg-mb-40">
                  <h3 className="title">Overview</h3>
                  <p>{candidate.profile?.overview}</p>
                </div>
                {candidate.profile?.video &&
                  (<><h3 className="title">Intro</h3>
                    <div className="video-post d-flex align-items-center justify-content-center mt-25 lg-mt-20 mb-75 lg-mb-50">
                      <VideoPlayer video={candidate.profile?.video} />
                    </div></>)}
                <div className="inner-card border-style mb-75 lg-mb-50">
                  <h3 className="title">Education</h3>
                  <div className="time-line-data position-relative pt-15">
                    {candidate.profile.educations?.map((item: any, index: number) => (
                      <div className="info position-relative" key={index}>
                        <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">{index + 1}</div>
                        <div className="text_1 fw-500">{item?.college}</div>
                        <h4>{item?.title}</h4>
                        <p>{item?.description}.</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="inner-card border-style mb-75 lg-mb-50">
                  <h3 className="title">Skills</h3>
                  {/* skill area */}
                  <Skills skills={candidate.profile?.skills} />
                  {/* skill area */}
                </div>
                {candidate?.profile?.experiences?.length !== 0 && <div className="inner-card border-style mb-60 lg-mb-50">
                  <h3 className="title">Work Experience</h3>
                  {/* WorkExperience */}
                  <WorkExperience experience={candidate.profile?.experiences} />
                  {/* WorkExperience */}
                </div>}
                {/* <h3 className="title">Projects</h3> */}
                {/* Candidate Profile Slider */}
                {/* <CandidateProfileSlider projects={data.projects} /> */}

                {candidate.profile?.projects?.length !== 0 && <div className="inner-card  mb-75 lg-mb-50">
                  <h3 className="title">Projects</h3>
                  <div className=" pt-15 row">
                    {candidate.profile.projects?.map((item: any, index: number) => (

                      <div className="col-xxl-4 col-lg-4"  key={index}><Projects item={item} index={index} /></div>
                    ))}
                  </div>
                </div>}
                {candidate.profile?.achievements?.length !== 0 && <div className="inner-card mb-75 lg-mb-50">
                  <h3 className="title">Achievements </h3>
                  <div className=" pt-15 row">
                    {candidate.profile.achievements?.map((item: any, index: number) => (
                      <div className="col-xxl-4 col-lg-4" data-bs-toggle="modal" data-bs-target={`#achievementsModal${index}`} key={index}> <Achievements item={item} index={index} />
                      <div><AchievementsModel item={item} index={index}/></div></div>
                    ))}
                  </div>
                </div>}

                {/* Candidate Profile Slider */}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4">
              <div className="cadidate-profile-sidebar ms-xl-5 ms-xxl-0 md-mt-60">
                <div className="cadidate-bio bg-wrapper bg-color mb-60 md-mb-40">
                  <div className="pt-25">
                    <div className="cadidate-avatar m-auto">
                      <Image src={candidate?.profile?.avatar ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/avatars/${candidate?.profile?.avatar}` : "/assets/images/candidates/01.png"} alt="avatar" className="lazy-img rounded-circle border w-100" width={70} height={70} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <h3 className="cadidate-name text-center">{candidate?.profile?.name}</h3>
                  {/* <div className="text-center pb-25"><a href="#" className="invite-btn fw-500">Invite</a></div> */}
                  {/* CandidateBio */}
                  <CandidateBio profileData={candidate?.profile} />
                  {/* CandidateBio */}
                  <a href="#" className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15">Download CV</a>
                </div>
                <h4 className="sidebar-title">Location</h4>
                <div className="map-area mb-60 md-mb-40">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe className="gmap_iframe h-100 w-100" src={candidate?.profile?.mapSrc}></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> : <ErrorPageArea title="Candidate Not Found" />}

    </>
  );
};

export default CandidateDetailsArea;