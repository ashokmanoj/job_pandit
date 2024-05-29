import NiceSelect from "@/ui/nice-select";
import React from "react";

const EmployExperience = ({
  experience,
  setExperience,
  education,
  setEducation,
  expertise,
  setExpertise,
  location,
  setLocation,
}: any) => {
  const handleExperience = (item: { value: string; label: string }) => {
    setExperience({ ...experience, label: item.value });
  };
  const handleEducation = (item: { value: string; label: string }) => {
    setEducation({ ...education, label: item.value });
  };
  const handleExpertise = (item: { value: string; label: string }) => {
    setExpertise({ ...expertise, label: item.value });
  };
  const handleLocation = (item: { value: string; label: string }) => {
    setLocation({ ...location, label: item.value });
  };

  return (
    <div className="row align-items-end">
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Expertise*</label>
          <NiceSelect
            options={[
              { value: "Freshers", label: "Freshers" },
              { value: "Intermediate", label: "Intermediate" },
              { value: "Experienced", label: "Experienced" },
              { value: "Expert", label: "Expert" },
              { value: "Any Expertise", label: "Any Expertise" },
            ]}
            defaultCurrent={0}
            onChange={(item) => handleExpertise(item)}
            name="Expertise"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Experience*</label>
          <NiceSelect
            options={[
              { value: "Any", label: "Any" },
              {
                value: "Less than 1 year",
                label: "Less than 1 year",
              },
              { value: "0 - 1 year", label: "0  -1 year" },
              { value: "1 - 2 year", label: "1 - 2 year" },
              { value: "2 - 3 year", label: "2 - 3 year" },
              { value: "3 - 4 year", label: "3 - 4 year" },
              { value: "4 - 5 year", label: "4 - 5 year" },
            ]}
            defaultCurrent={0}
            onChange={(item) => handleExperience(item)}
            name="Experience"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Education*</label>
          <NiceSelect
            options={[
              { value: "Any", label: "Any" },
              { value: "10th", label: "10th" },
              { value: "12th", label: "12th" },
              { value: " Any Graduate", label: "Any Graduate" },
              { value: "Post-Graduate", label: "Post-Graduate" },
              { value: "PhD", label: "PhD" },
              { value: "MBA", label: "MBA" },
              { value: "MCA", label: "MCA" },
              { value: "BCA", label: "BCA" },
              { value: "Diploma", label: "Diploma" },
              { value: "Bsc", label: "Bsc" },
              { value: "Msc", label: "Msc" },
              { value: "BBA", label: "BBA" },
              { value: "B.Com", label: "B.Com" },
              { value: "M.Com", label: "M.Com" },
              { value: "BA", label: "BA" },
            ]}
            defaultCurrent={0}
            onChange={(item) => handleEducation(item)}
            name="Education"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Location*</label>
          <input
            type="text"
            placeholder="Ex: Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployExperience;
