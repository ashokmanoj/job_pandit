import NiceSelect from '@/ui/nice-select'
import React from 'react'

const category = ({category, setCategory,title}:{category:any, setCategory:any,title?:any}) => {
  return (
    <div className="dash-input-wrapper mb-30">
      {!title && <label htmlFor="">Category <span className="text-danger">*</span></label>}
      <NiceSelect
        options={[
          { value: "Software Development", label: "Software Development" },
          { value: "Web Development", label: "Web Development" },
          { value: "Mobile App Development", label: "Mobile App Development" },
          { value: "Graphics Design", label: "Graphics Design" },
          { value: "Digital Marketing", label: "Digital Marketing" },
          { value: "Content Writing", label: "Content Writing" },
          { value: "Data Entry", label: "Data Entry" },
          { value: "Real estate & Construction", label: "Real estate & Construction" },
          { value: "Automobile", label: "Automobile" },
          { value: "Delivery", label: "Delivery" },
          { value: "Clothing", label: "Clothing" },
          { value: "Toursim", label: "Toursim" },
          { value: "Event Management", label: "Event Management" },
          { value: "Airport", label: "Airport" },
          { value: "BPO", label: "BPO" },
          { value: "StockMarket", label: "StockMarket" },
          { value: "IT", label: "IT" },
          { value: "Data Analysis", label: "Data Analysis" },
          { value: "Gaming", label: "Gaming" },
          { value: "Manual Testing", label: "Manual Testing" },
          { value: "SEO", label: "SEO" },
          { value: "Advertisement", label: "Advertisement" },
          { value: "Video Editing", label: "Video Editing" },
          { value: "Food & Beverages", label: "Food & Beverages" },
          { value: "Medicine", label: "Medicine" },
          { value: "Health Care", label: "Health Care" },
          { value: "Hospitality", label: "Hospitality" },
          { value: "Cloud Computing", label: "Cloud Computing" },
          { value: "Networking", label: "Networking" },
          {value: "Photography", label: "Photography"},
          { value: "Education", label: "Education" },
          { value: "Banking", label: "Banking" },
          { value: "Insurance", label: "Insurance" },
          { value: "Law", label: "Law" },
          { value: "Accounting", label: "Accounting" },
          { value: "Real Estate", label: "Real Estate" },
          { value: "Construction", label: "Construction" },
          { value: "Manufacturing", label: "Manufacturing" },
          { value: "Other", label: "Other" },
          
        ]}
        defaultCurrent={0}
        onChange={(item) => setCategory(item.value)}
        name="Job Type"
        cls='category'
        value={category}
      />
    </div>
  )
}

export default category