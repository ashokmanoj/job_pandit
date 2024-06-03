import React from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { notifySuccess } from "@/utils/toast";

const ActionDropdown = ({jobpost }: { jobpost: any }) => {
 function handleCopy() {
   try{
     navigator.clipboard.writeText(window.location.origin + "/job-details/"+jobpost.id).then(() => {
       notifySuccess("Link copied to clipboard");
     });
   }catch(err){
     console.log(err);
   }
 }

    function handleDelete(id: any) {
      console.log(id);
    }

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <a className="dropdown-item" href={`/job-details/${jobpost.id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </a>
      </li>
      <li>
        <a className="dropdown-item" href={`/dashboard/employ-dashboard/submit-job/${jobpost.id}`}>
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </a>
      </li>
      <li>
        <button className="dropdown-item" onClick={handleCopy}>
          <Image src={share} alt="icon" className="lazy-img" /> Share
        </button>
      </li>
      <li>
        <button className="dropdown-item " >
          <Image src={delete_icon} alt="icon" className="lazy-img" onClick={()=>{handleDelete(jobpost.id)}}/> Delete
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
