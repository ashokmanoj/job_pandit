import React from "react";
import useFilterStore from "@/lib/store/filter";


// job type items

export function JobTypeItems({ showLength = true, job_data }: { showLength?: boolean, job_data:any[] }) {
  const jobDuration = [...new Set(job_data.map((job) => job.job_type))];
  const { job_type ,setJobType} = useFilterStore((state) => state);
  return (
    <>
      {jobDuration.map((duration, index) => (
        <li key={index}>
          <input
            onChange={() => setJobType(duration)}
            type="checkbox"
            name="JobType"
            defaultValue={duration}
            checked={job_type.includes(duration)}
          />
          <label>
            {duration}{" "}
            {showLength && (
              <span>
                {job_data.filter((job) => job.duration === duration).length}
              </span>
            )}
          </label>
        </li>
      ))}
    </>
  );
}

const JobType = ({job_data}: {job_data:any[]}) => {
  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        <JobTypeItems job_data={job_data} />
      </ul>
    </div>
  );
};

export default JobType;
