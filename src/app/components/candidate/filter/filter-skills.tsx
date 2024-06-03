import React from "react";

import NiceSelect from "@/ui/nice-select";
import useCandidateFilterStore from "@/lib/store/candidate";

const FilterSkills = ({candidate_data}:{candidate_data:any[]}) => {
  const uniqueSkills = [...new Set(candidate_data.map((c:any) => c.skills))];
  const {setSkills} = useCandidateFilterStore();
  const options = uniqueSkills.map((c) => {
    return { value: c, label: c };
  });
  const handleSkills = (item: { value: string; label: string }) => {
    setSkills(item.value)
  };
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleSkills(item)}
      cls="bg-white"
      name="Category"
    />
  );
};

export default FilterSkills;
