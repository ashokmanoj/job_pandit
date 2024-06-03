import React from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { notifySuccess } from "@/utils/toast";

const ActionDropdown = ({ j, remove_wishlist_product }: { j: any , remove_wishlist_product:any}) => {
 function handleCopy() {
   try{
     navigator.clipboard.writeText(window.location.origin + "/job-details/" + j.id).then(() => {
       notifySuccess("Link copied to clipboard");
     });
   }catch(err){
     console.log(err);
   }
 }

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <a className="dropdown-item" href={`/job-details/${j.id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </a>
      </li>
      <li>
        <button className="dropdown-item" onClick={handleCopy}>
          <Image src={share} alt="icon" className="lazy-img" /> Share
        </button>
      </li>
      <li>
        <button className="dropdown-item "  onClick={()=>{remove_wishlist_product(j)}}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
