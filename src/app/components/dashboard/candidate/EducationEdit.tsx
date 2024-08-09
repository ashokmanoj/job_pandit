import React from "react";

const EducationEdit = ({education,handleDelete}: {education: any[],handleDelete:any}) => {
  return (
    <div className="time-line-data position-relative pt-15">
      {education?.map((item, index) => (
        <div className="info position-relative" key={index}>
        <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center ">
          {index + 1}
        </div>
        <h4>{item.title}&nbsp;<span style={{fontWeight: 'lighter'}}>({item.college})</span></h4>
        <div className="text_1 fw-500">{item.from} &nbsp;&nbsp;<span style={{color: '#000', fontWeight: 'bold'}}>-</span>&nbsp;&nbsp; {item.to}</div>
        
        <i className="bi bi-x-circle cursor-pointer position-absolute top-0 end-0 p-3 translate-middle fs-5 text-danger tran3s  " onClick={handleDelete(index)} ></i>
        <p>
          {item.description}
        </p>
      </div>
      ))
       
      }
     
    </div>
  );
};

export default EducationEdit;