import NiceSelect from '@/ui/nice-select'
import React from 'react'

const category = ({category, setCategory,title}:{category:any, setCategory:any,title?:any}) => {
  return (
    <div className="dash-input-wrapper mb-30">
      {!title && <label htmlFor="">Category <span className="text-danger">*</span></label>}
      <NiceSelect
        options={[
          { value: "Web Development", label: "Web Development" },
          { value: "Real estate & Construction", label: "Real estate & Construction" },
          { value: "Digital Marketing", label: "Digital Marketing" },
          { value: "BPO", label: "BPO" },
          { value: "IT", label: "IT" },
          { value: "IT", label: "IT" },
          { value: "Networking", label: "Networking" },
          { value: "Data Analysis", label: "Data Analysis" },
          { value: "Cloud Computing", label: "Cloud Computing" },
          { value: "Automobile", label: "Automobile" },
          { value: "Accounting", label: "Accounting" },
          { value: "Mobile App Development", label: "Mobile App Development" },
          { value: "Graphics Design", label: "Graphics Design" },
          { value: "Content Writing", label: "Content Writing" },
          { value: "Delivery", label: "Delivery" },
          { value: "Clothing", label: "Clothing" },
          { value: "Toursim", label: "Toursim" },
          { value: "Event Management", label: "Event Management" },
          { value: "Airport", label: "Airport" },
          { value: "StockMarket", label: "StockMarket" },
          { value: "Gaming", label: "Gaming" },
          { value: "Manual Testing", label: "Manual Testing" },
          { value: "Software Development", label: "Software Development" },
          { value: "SEO", label: "SEO" },
          { value: "Advertisement", label: "Advertisement" },
          { value: "Video Editing", label: "Video Editing" },
          { value: "Food & Beverages", label: "Food & Beverages" },
          { value: "Medicine", label: "Medicine" },
          { value: "Health Care", label: "Health Care" },
          { value: "Hospitality", label: "Hospitality" },
          { value: "Photography", label: "Photography"},
          { value: "Education", label: "Education" },
          { value: "Banking", label: "Banking" },
          { value: "Insurance", label: "Insurance" },
          { value: "Real Estate", label: "Real Estate" },
          { value: "Construction", label: "Construction" },
          { value: "Manufacturing", label: "Manufacturing" },
          { value: "Data Science", label: "Data Science" },
          { value: "Sales", label: "Sales" },
          { value: "Devops", label: "Devops" },
          { value: "BSFI", label: "BSFI" },
          { value: "Fitness", label: "Fitness" },
          { value: "DBA", label: "DBA" },
          { value: "Retail", label: "Retail" },
          { value: "Chartered Accountant", label: "Chartered Accountant" },
          { value: "Software Testing", label: "Software Testing" },
          { value: "Artificial Intelligence", label: "Artificial Intelligence" },
          { value: "Software Services", label: "Software Services" },
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