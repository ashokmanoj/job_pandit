import React from "react";
import NiceSelect from "@/ui/nice-select";
import slugify from "slugify";

const JobCategorySelect = ({
  setCategoryVal,
  job_data
}: {
  setCategoryVal: React.Dispatch<React.SetStateAction<string>>;
  job_data: any[];
}) => {
  const uniqueCategories = [
    ...new Set(job_data?.flatMap((job:any) => job.category)),
  ];
  // category_option
  const category_option = uniqueCategories.map((c ) => {
    return {
      value: slugify(c.split(",").join("-").toLowerCase(), "-"),
      label: c,
    };
  });
  const handleCategory = (item: { value: string; label: string }) => {
    setCategoryVal(item.value);
  };
  return (
    <NiceSelect
      options={category_option}
      defaultCurrent={0}
      onChange={(item) => handleCategory(item)}
      name="Category"
      cls="category"
    />
  );
};

export default JobCategorySelect;
