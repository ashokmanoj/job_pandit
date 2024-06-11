import React from "react";
import ActionDropdownConsultant from "../consultant/AddDropDown";



const EmployJobItem = ({
  title,
  info,
  date,
  application,
  status,
  jobPost
}: {
  title: string;
  info: string;
  date: string;
  application: string;
  status: string;
  jobPost: any
}) => {
  return (
    <tr className={status}>
      <td>
        <div className="job-name fw-500">{title}</div>
        <div className="info1">{info}</div>
      </td>
      <td>{new Date(date).toDateString()}</td>
      <td>{application} Applications</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
      </td>
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          {/* action dropdown start */}
          <ActionDropdownConsultant jobpost={jobPost} />
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
