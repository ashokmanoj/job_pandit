"use client"
import React, { useEffect, useState } from 'react';
import DashboardHeader from './dashboard-header';
import DashboardPortfolio from './dashboard-portfolio';
import UploadResume from '../uploadResume';
import VideoUploader from './videoUploader';
import AddEducation from './AddEducation';
import Skills_Experience from './Skills_Experience';
import { notifyError, notifySuccess } from '@/utils/toast';
import { createClient } from '@/utils/supabase/client';

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
type educationType = {
  title: string
  college: string
  from: string
  to: string
  description: string
}
type experienceType = {
  title: string
  company: string
  from: string
  to: string
  description: string
}

type projectType = {
  title: string
  description: string
  image: string
  url: string
}


const DashboardResume = ({ setIsOpenSidebar }: IProps) => {

const [isData, setIsData] = useState<boolean>(false);
const [user, setUser] = useState<any>(null);

  const [overview, setOverview] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [resume, setResume] = useState<string>('');
  const [educations, setEducation] = useState<educationType[]>([]);
  const [experiences, setExperience] = useState<experienceType[]>([]);
  const [skills, setSkills] = useState<any>([]);
  const [projects, setProjects] = useState<projectType[]>([]);
  const supabase = createClient();

  async function handleAdd(){
   

if(isData){
  const { data,error } = await supabase
    .from('candidate_resume_details')
    .update({
      resume,
      overview,
      video,
     educations,
     experiences,
      skills,
      projects
    }).eq('user_id', user.id).single();
  if (error) {
    console.error("Error updating data:", error.message);
    notifyError("Error updating data",);
    setIsData(false);
    
  } else {
    console.log("Data updated successfully",data);
    notifySuccess("Data updated successfully",);
    setIsData(false);
  }
}else{
  if(overview===''){
    return notifyError('Please Enter Overview');
  }
  else if(educations.length===0){
    return notifyError('Please Add Education');
  }
  else if(experiences.length===0){
    return notifyError('Please Add Experience');
  }
  else if(projects.length===0){
    return notifyError('Please Add Projects');
  }
  else if(skills.length===0){
    return notifyError('Please Add Skills');
  }
  else{
  const { error } = await supabase
    .from('candidate_resume_details').insert([{user_id:user?.id, resume,overview, video,  educations, experiences, skills, projects}]);
  if (error) {
    console.error("Error inserting data:", error.message);
    notifyError("Error inserting data");
    setIsData(true);
  } else {
    console.log("Data inserted successfully");
    notifySuccess("Data inserted successfully");
    setIsData(true);
  }
}
    }

  }

 useEffect(() => {
    const fetchData = async () => {
      const user: any = (await supabase.auth.getUser()).data.user;
      setUser(user);
      console.log(user);
      const { data, error } = await supabase
        .from('candidate_resume_details')
        .select('*')
        .eq('user_id', user.id).single();
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        console.log("Data fetched successfully:", data);
        setResume(data.resume);
        setOverview(data.overview);
        setVideo(data.video);
        setEducation(data.educations);
        setExperience(data.experiences);
        setSkills(data.skills);
        setProjects(data.projects);
        setIsData(true);
       
      }  
      }

  fetchData();
}, []);

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          <h2 className="main-title">My Resume</h2>

          <UploadResume resume={resume} setResume={setResume} />


          <div className="bg-white card-box border-20 mt-40">
            <h4 className="dash-title-three">Intro & Overview</h4>
            <div className="dash-input-wrapper mb-35 md-mb-20">
              <label htmlFor="">Overview*</label>
              <textarea className="size-lg" placeholder="Write something interesting about you...." onChange={(e) => setOverview(e.target.value)} value={overview}></textarea>
              <div className="alert-text">Brief description for your resume. URLs are hyperlinked.</div>
            </div>

            <VideoUploader video={video} setVideo={setVideo} />
          </div>


          <AddEducation education={educations} setEducation={setEducation} />
          <Skills_Experience skills={skills} setSkills={setSkills} experience={experiences} setExperience={setExperience} />
          <DashboardPortfolio projects={projects} setProjects={setProjects} />

          <div className="button-group d-inline-flex align-items-center mt-30">
            <button className="dash-btn-two tran3s me-3" onClick={handleAdd}>Save</button>
            <a href="#" className="dash-cancel-btn tran3s">Cancel</a>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default DashboardResume;