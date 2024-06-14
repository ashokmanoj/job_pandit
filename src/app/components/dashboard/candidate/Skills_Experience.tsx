'use client'
import React, { useState } from 'react'
import WorkExperienceEdit from './WorkExperienceEdit';
import { notifyError } from '@/utils/toast';

const Skills_Experience = ({skills, setSkills, experience, setExperience}:{skills:any[], setSkills:any, experience:any[], setExperience:any}) => {
 const [val ,setVal] = useState<string>('');
 const [expValue, setExpValue] = useState<{title:string,company:string,from:string,to:string,description:string}>({title:'',company:'',from:'',to:'',description:''});

 const jobMarketSkills = [
  "Communication Skills",
  "Teamwork",
  "Problem-Solving",
  "Time Management",
  "Adaptability",
  "Critical Thinking",
  "Leadership",
  "Technical Proficiency",
  "Customer Service",
  "Project Management",
  "Data Analysis",
  "Emotional Intelligence",
  "Sales Skills",
  "Marketing",
  "Creativity",
  "Networking",
  "Negotiation",
  "Conflict Resolution",
  "Financial Literacy",
  "Attention to Detail",
  "Organizational Skills",
  "Research Skills",
  "Coding/Programming",
  "Public Speaking",
  "Bilingual/Multilingual",
  "Risk Management",
  "Strategic Planning",
  "Innovation",
  "Customer Relationship Management (CRM)",
  "Remote Work Proficiency",
  "Cloud Computing",
  "Cybersecurity",
  "Artificial Intelligence/Machine Learning",
  "Data Science",
  "Blockchain",
  "Web Development",
  "Mobile App Development",
  "Database Management",
  "Software Development",
  "Network Engineering",
  "DevOps",
  "UI/UX Design",
  "Big Data",
  "Virtualization",
  "IT Support",
  "Robotics"
];
  function handleDelete(i: any) {
    return () => {
      const newSkills = [...skills];
      newSkills.splice(i, 1);
      setSkills(newSkills);
    };

  }
  function handleDeleteExp(i: any) {
    return () => {
      const newExp = [...experience];
      newExp.splice(i, 1);
      setExperience(newExp);
    };

  }

  function handleAdd(e: any) {
    e.preventDefault();
    if(val===''){
      return notifyError('Please Enter Skill')
    }
    setSkills([...skills, val]);
    setVal('');


  }


   const handleAddExp = (e: any) => {
    e.preventDefault();
    if(expValue.title===''){
      return notifyError('Please Enter Title')
    }else if(expValue.company===''){
     return notifyError('Please Enter Company')
    }
    else if(expValue.from===''){
     return notifyError('Please Enter From')
    }
    else if(expValue.to===''){
    return  notifyError('Please Enter To')
    }
    else if(expValue.description===''){
     return notifyError('Please Enter Description')
    }
    else{
      setExperience([...experience, expValue])
      setExpValue({ title: '', company: '', from: '', to: '', description: '' })
    }
   }
  

  return (
    <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Skills & Experience <span style={{color:'red'}}>*</span></h4>
          <div className="dash-input-wrapper mb-40">
            <label htmlFor="">Add Skills</label>

            <div className="skills-wrapper">
              <ul className="custom-list style-none d-flex flex-wrap align-items-center">
              {skills?.map((item:any, i:any) => (
                <li key={i} className="is_tag"><button>{item} <i className="bi bi-x" onClick={handleDelete(i)} ></i></button></li>
              ))}
                <li className="is_tag"><button><input type="text" value={val} onChange={(e) =>{ setVal(e.target.value)}} className='w-100 border-0 p-0 bg-transparent text-dark'/></button></li>
                <li className="more_tag"><button style={{ cursor: "pointer",color:"black" }} onClick={handleAdd}>+</button></li>
              </ul>
              <ul className="custom-list">
            {jobMarketSkills?.filter((item) => !skills?.includes(item))?.map((item: any, i: any) => (
              <li key={i}  onClick={() => { setSkills([...skills, item]) }}><button >{item}</button></li>
            ))}
          </ul>
            </div>
          </div>
          <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
          <div className="inner-card border-style mb-60 lg-mb-50">
                  <h3 className="dash-title-three">Experience <span style={{color:'gray',fontSize:'12px'}}>(Recommended)</span> </h3>
                  {/* WorkExperience */}
                  <WorkExperienceEdit experience={experience} handleDelete={handleDeleteExp} />
                  {/* WorkExperience */}
               
          
          <div className="dash-input-wrapper mb-15">
            {/* <label htmlFor="">Add Work Experience*</label> */}
          </div>

          <div className="accordion dash-accordion-one" id="accordionTwo">
          
            <div className="accordion-item">
              <div className="accordion-header" id="headingOneA">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneA" aria-expanded="false" aria-controls="collapseOneA">
                 Add Experience or Internship
                </button>
              </div>
              <div id="collapseOneA" className="accordion-collapse collapse" aria-labelledby="headingOneA" data-bs-parent="#accordionTwo">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Title<span className="text-danger">*</span></label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="text" placeholder="Ex : Product Designer "  value={expValue.title} onChange={(e) => setExpValue({...expValue,title:e.target.value})}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Company<span className="text-danger">*</span></label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="text" placeholder="Ex : Infosys" value={expValue.company} onChange={(e) => setExpValue({...expValue,company:e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Year<span className="text-danger">*</span></label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="row">
                        <div className="col-sm-6">
                          {/* <SelectYear /> */}
                          <div className="dash-input-wrapper mb-30">
                <label htmlFor="">From</label>
                <input type="date" value={expValue.from} onChange={(e) => setExpValue({...expValue,from:e.target.value})} />
              </div>
                        </div>
                        <div className="col-sm-6">
                          {/* <SelectYear /> */}
                          <div className="dash-input-wrapper mb-30">
                <label htmlFor="">To</label>
                <input type="date" value={expValue.to} onChange={(e) => setExpValue({...expValue,to:e.target.value})} />
              </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Description<span className="text-danger">*</span></label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <textarea className="size-lg" placeholder="Write something about your previous experience...." value={expValue.description} onChange={(e) => setExpValue({...expValue,description:e.target.value})}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="dash-btn-one" onClick={handleAddExp}><i className="bi bi-plus"></i> Add more</a>
        </div>
        </div>
        </div>
  )
}

export default Skills_Experience