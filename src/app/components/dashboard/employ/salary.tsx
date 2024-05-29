import NiceSelect from "@/ui/nice-select";
import React from "react";

const Salary = ({ salary, setSalary }: any) => {
  const handleSalary = (item: { value: string; label: string }) => {
    setSalary({ ...salary, label: item.value });
  };

  return (
    <div className="dash-input-wrapper mb-30">
      <label htmlFor="">Salary*</label>
      <NiceSelect
        options={[
          { value: "yearly", label: "Yearly" },
          { value: "Fixed", label: "Fixed" },
          { value: "Hourly", label: "Hourly" },
          { value: "Monthly", label: "Monthly" },
          { value: "Weekly", label: "Weekly" },
        ]}
        defaultCurrent={0}
        onChange={(item) => handleSalary(item)}
        name="Salary"
      />
    </div>
  );
};

export default Salary;
