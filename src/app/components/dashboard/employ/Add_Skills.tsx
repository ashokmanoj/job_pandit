"use client";
import React, { useState } from "react";
import { notifyError } from "@/utils/toast";

const AddSkills = ({ skills, setSkills }: { skills: string[], setSkills: any }) => {
  const [val, setVal] = useState<string>("");
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

  function handleAdd(e: any) {
    e.preventDefault();
    if (val === "") {
      return notifyError("Please Enter Skill");
    }
    setSkills([...skills, val]);
    setVal("");
  }

  return (
    <div className="bg-white border-20 mt-40">
      <h4 className="dash-title-three">Skills & Experience</h4>
      <div className="dash-input-wrapper mb-40">
        <label htmlFor="">Add Skills*</label>

        <div className="skills-wrapper">
          <ul className=" custom-list style-none d-flex flex-wrap align-items-center">
            {skills?.map((item: any, i: any) => (
              <li key={i} className="is_tag">
                <button>
                  {item} <i className="bi bi-x" onClick={handleDelete(i)}></i>
                </button>
              </li>
            ))}
            <li className="is_tag">
              <button>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setVal(e.target.value);
                  }}
                  className="w-100 border-0 p-0 bg-transparent text-dark"
                />
              </button>
              
            </li>
            <li className="more_tag text-black">
              <button onClick={handleAdd} style={{ cursor: "pointer",color:"black" }}>+</button>
             </li>
            
          </ul>

          <ul className="custom-list">
            {jobMarketSkills?.filter((item) => !skills.includes(item))?.map((item: any, i: any) => (
              <li key={i}  onClick={() => { setSkills([...skills, item]) }}><button >{item}</button></li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default AddSkills;
