import React from "react";
import useFilterStore from "@/lib/store/filter";


const JobTags = ({job_data}: {job_data:any[]}) => {
  const uniqueTags = [...new Set(job_data.flatMap((job) => job.skills))];
  const { tags,setTags } = useFilterStore((state) => state);
  return (
    <div className="main-body">
      <ul className="style-none d-flex flex-wrap justify-space-between radio-filter mb-5">
        {uniqueTags.map((t, i) => (
          <li key={i}>
            <input
              onChange={() => setTags(t as string)}
              type="checkbox"
              name="tags"
              defaultValue={t}
              checked={tags.includes(t as string)}
            />
            <label>{t}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobTags;
