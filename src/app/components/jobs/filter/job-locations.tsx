import React from 'react';
import slugify from 'slugify';
import NiceSelect from '@/ui/nice-select';
import useFilterStore from '@/lib/store/filter';


const JobLocations = ({job_data}: {job_data:any[]}) => {
  const uniqueLocations = [...new Set(job_data.map(job => job.location))];
  const {  setLocation } = useFilterStore((state) => state);
  const handleLocation = (item: { value: string; label: string }) => { 
    setLocation(item.value)
  };
  const options = uniqueLocations.map((l) => {
    return {value:slugify(l.split(',').join('-').toLowerCase(),'-'),label:l}
  })
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleLocation(item)}
      name="Location"
    />
  );
};

export default JobLocations;