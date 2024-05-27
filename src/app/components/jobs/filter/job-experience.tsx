import React from "react";
import job_data from "@/data/job-data";
import useFilterStore from "@/lib/store/filter";


export function JobExperienceItems({showLength = true}: {showLength?: boolean}) {
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

const JobExperience = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobExperienceItems />
        </ul>
      </div>
    </>
  );
};

export default JobExperience;
