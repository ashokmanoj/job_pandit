import React from "react";
import useFilterStore from "@/lib/store/filter";


export function JobExperienceItems({showLength = true, job_data}: {showLength?: boolean, job_data:any[]}) {
  const uniqueExperiences = [...new Set(job_data.map((job) => job.experience))];
  const { experience,setExperience } = useFilterStore((state) => state);
  return (
    <>
      {uniqueExperiences.map((e, index) => (
        <li key={index}>
          <input
            onChange={() => setExperience(e)}
            type="checkbox"
            name={e}
            defaultValue={e}
            checked={experience.includes(e)}
          />
          <label>
            {e}
            {showLength && (
              <span>
                {job_data.filter((job) => job.experience === e).length}
              </span>
            )}
          </label>
        </li>
      ))}
    </>
  );
}

const JobExperience = ({job_data}: {job_data:any[]}) => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobExperienceItems job_data={job_data} />
        </ul>
      </div>
    </>
  );
};

export default JobExperience;
