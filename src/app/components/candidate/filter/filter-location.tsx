import candidate_data from '@/data/candidate-data';
import useCandidateFilterStore from '@/lib/store/candidate';
import NiceSelect from '@/ui/nice-select';
import React from 'react';
import slugify from 'slugify';

const FilterCandidateLocation = ({candidate_data}:{candidate_data:any[]}) => {
  const uniqueLocations = [...new Set(candidate_data.map(c => c.location))];
  const {setLocation} = useCandidateFilterStore();

  const handleLocation = (item: { value: string; label: string }) => {setLocation(item.value)};
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

export default FilterCandidateLocation;