import NiceSelect from "@/ui/nice-select";
import React from "react";

const EmployExperience = ({
  experience,
  setExperience,
}: any) => {

 return (
     <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Experience <span className="text-danger">*</span></label>
          <NiceSelect
            options={[
              { value: "Any", label: "Any" },
              { value: "Fresher",label: "Fresher",},
              { value: "1+ Year", label: "1+ Year" },
              { value: "2+ Year", label: "2+ Year" },
              { value: "3+ Year", label: "3+ Year" },
              { value: "4+ Year", label: "4+ Year" },
              { value: "5+ Year", label: "5+ Year" },
              { value: "6+ Year", label: "6+ Year" },
              { value: "7+ Year", label: "7+ Year" },
              { value: "8+ Year", label: "8+ Year" },
              { value: "9+ Year", label: "9+ Year" },
              { value: "10+ Year", label: "10+ Year" }, 
            ]}
            defaultCurrent={0}
            onChange={(item) => setExperience(item.value)}
            name="Experience"
            cls="category"
            placeholder="Ex : 1+ years of Experience"
            value={experience}
          />
        </div>
      </div>
       );
};

export default EmployExperience;
