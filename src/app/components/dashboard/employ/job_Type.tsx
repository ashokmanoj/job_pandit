import NiceSelect from "@/ui/nice-select";
import React from "react";

const Job_Type = ({ jobType, setJobType }: any) => {


  return (
    <div className="dash-input-wrapper mb-30">
      <label htmlFor="">Job Type*</label>
      <NiceSelect
        options={[
          { value: "Full time", label: "Full time" },
          { value: "Part time", label: "Part time" },
          { value: "Hourly-Contract", label: "Hourly-Contract" },
          
        ]}
        defaultCurrent={0}
        onChange={(item) => setJobType(item.value)}
        name="Job Type"
        value={jobType}
      />
    </div>
  );
};

export default Job_Type;
