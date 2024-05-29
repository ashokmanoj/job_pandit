"use client";
import React, { useState } from "react";
import { notifyError } from "@/utils/toast";

const AddSkills = ({ skills, setSkills }: any) => {
  const [val, setVal] = useState<string>("");

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
          <ul className="style-none d-flex flex-wrap align-items-center">
            {skills.map((item: any, i: any) => (
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
            <li className="more_tag">
              <button onClick={handleAdd}>+</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddSkills;
