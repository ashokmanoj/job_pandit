import React from 'react';
import NiceSelect from '@/ui/nice-select';
import useCompanyFilterStore from '@/lib/store/company';
import slugify from 'slugify';


const FilterCompanyLocation = ({company_data}: {company_data: any[]}) => {
  const uniqueLocations = [...new Set(company_data.map(c => c.city))];
  const {  setLocation } = useCompanyFilterStore((state) => state);
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

export default FilterCompanyLocation;