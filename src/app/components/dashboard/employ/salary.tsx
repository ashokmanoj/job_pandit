import NiceSelect from "@/ui/nice-select";
import React from "react";

const Salary = ({ salary, setSalary }: any) => {
 

  return (
    <div className="dash-input-wrapper mb-30">
      <label htmlFor="">Salary Type*</label>
      <NiceSelect
        options={[
          { value: "Yearly", label: "Yearly" },
          { value: "Fixed", label: "Fixed" },
          { value: "Hourly", label: "Hourly" },
          { value: "Monthly", label: "Monthly" },
          { value: "Weekly", label: "Weekly" },
        ]}
        defaultCurrent={0}
        onChange={(item) => setSalary(item.value)}
        name="Salary"
      />
    </div>
  );
};

export default Salary;
