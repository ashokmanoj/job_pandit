import React from "react";

const MemberEdit = ({
  member,
  handleDelete,
}: {
  member: [{ name: string; designation: string; email: string }];
  handleDelete: any;
}) => {
  return (
    <div className="time-line-data position-relative pt-15">
      {member?.map((item, index) => (
        <div className="info position-relative" key={index}>
          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center ">
            {index + 1}
          </div>

          <h3>{item.name}</h3>
          <h4>{item.designation}</h4>
          <i
            className="bi bi-x-circle cursor-pointer position-absolute top-0 end-0 p-3 translate-middle fs-5 text-danger tran3s  "
            onClick={handleDelete(index)}
          ></i>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default MemberEdit;
