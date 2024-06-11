import NiceSelect from '@/ui/nice-select';
import React from 'react'

const Education = ({ education, setEducation }: any) => {

  return (
    <div className="col-md-6">
      <div className="dash-input-wrapper mb-30">
        <label htmlFor="">Education <span className="text-danger">*</span></label>
        <NiceSelect
          options={[
            { value: "Any", label: "Any" },
            { value: "SSLC", label: "SSCL" },
            { value: "PUC", label: "PUC" },
            { value: "Any Graduation in CS", label: "Any Graduation in CS" },
            { value: "Any Post-Graduate", label: "Any Post-Graduate" },
            { value: "PhD", label: "PhD" },
            { value: "MBA", label: "MBA" },
            { value: "MCA", label: "MCA" },
            { value: "BCA", label: "BCA" },
            { value: "Diploma", label: "Diploma" },
            { value: "Bsc", label: "Bsc" },
            { value: "M.Sc", label: "Msc" },
            { value: "BBA", label: "BBA" },
            { value: "B.Com", label: "B.Com" },
            { value: "M.Com", label: "M.Com" },
            { value: "B.A", label: "B.A" },
            { value: "M.A", label: "MA" },
            { value: "CA", label: "CA" },
            { value: "M.Pharma", label: "M.Pharma" },
            { value: "Diploma", label: "Diploma" },
            { value: "ITI", label: "ITI" },
            { value: "PG Diploma", label: "PG Diploma" },
            { value: "MBBS", label: "MBBS" },
            { value: "B.Ed", label: "B.Ed" },
            { value: "B.Pharma", label: "B.Pharma" },
            { value: "M.Tech", label: "M.Tech" },
            { value: "B.Tech", label: "B.Tech" },
            { value: "Medical-MS/MD", label: "Medical-MS/MD" },
          ]}
          onChange={(item) => setEducation(item.value)}
          name="Education"
          cls='category'
          defaultCurrent={0} 
          value={education}/>
      </div>
    </div>
  )
}

export default Education