import React from "react";

const CandidateBio = ({profileData}: {profileData: any}) => {
  return (
    <ul className="style-none">
      <li>
        <span>Location: </span>
        <div>{profileData.city},{profileData.state}</div>
      </li>
      <li>
        <span>Age: </span>

        <div>{new Date().getFullYear() - new Date(profileData.dob).getFullYear()}</div>

      </li>
      <li>
        <span>Email: </span>
        <div>
          <a href={`mailto:${profileData?.contact_email}`}>{profileData?.contact_email}</a>
        </div>
      </li>
      <li>
        <span>Qualification: </span>
        <div>{profileData.qualification}</div>
      </li>
      <li>
        <span>Gender: </span>
        <div>{profileData.gender}</div>
      </li>
      <li>
        <span>Experience: </span>
        <div>{profileData.experience}</div>
      </li>
      <li>
        <span>Social:</span>
        <div>
          {/* <a href="#" className="me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a> */}
         {profileData?.social_links?.map((item:any,index:number)=>{
           return <a href={item.value} key={index} className="me-3">
            <i className={item.label==="Linkedin"? "bi bi-linkedin":item.label==="Twitter"? "bi bi-twitter":item.label==="Instagram"? "bi bi-instagram":item.label==="Facebook" ? "bi bi-facebook" : item.label==="Github" ? "bi bi-github":''}></i>
          </a>
         })}
        </div>
      </li>
    </ul>
  );
};

export default CandidateBio;
