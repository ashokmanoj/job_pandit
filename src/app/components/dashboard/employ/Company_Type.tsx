import NiceSelect from '@/ui/nice-select'
import React from 'react'

const Company_Type = ({companyType, setCompanyType}:any) => {
  return (
    <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Company Type <span className="text-danger">*</span></label>
                <NiceSelect
                  options={[
                    { value: "Others", label: "Others" },
                    { value: "Consultancy", label: "consultancye" },
                    { value: "Private companies", label: "Private companies" },
                    { value: "Government companies", label: "Government companies" },
                    { value: "Corporate company", label: "Corporate company" },
                  ]}
                  defaultCurrent={0}
                  name="CompanyType"
                  cls="category"
                  value={companyType}
                  onChange={(item) => setCompanyType(item.value)}
                />
              </div>
  )
}

export default Company_Type