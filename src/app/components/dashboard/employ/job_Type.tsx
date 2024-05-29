import NiceSelect from "@/ui/nice-select";
import React from "react";

const Job_Type = ({ jobType, setJobType }: any) => {
  const handleJobType = (item: { value: string; label: string }) => {
    setJobType({ ...jobType, label: item.value });
  };

  return (
    <div className="dash-input-wrapper mb-30">
      <label htmlFor="">Job Type</label>
      <NiceSelect
        options={[
          { value: "Full time", label: "Full time" },
          { value: "Part time", label: "Part time" },
          { value: "Hourly-Contract", label: "Hourly-Contract" },
          { value: "Fixed-Price", label: "Fixed-Price" },
        ]}
        defaultCurrent={0}
        onChange={(item) => handleJobType(item)}
        name="Job Type"
      />
    </div>
  );
};

export default Job_Type;
