import React from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { notifyError, notifySuccess } from "@/utils/toast";
import DeleteJobModal from "../../common/popup/delete-job";
import { deleteJob } from "@/hooks/client-request/job";

const ActionDropdownConsultant = ({ jobpost }: { jobpost: any }) => {
  function handleCopy() {
    try {
      navigator.clipboard.writeText(window.location.origin + "/job/" + jobpost.id).then(() => {
        notifySuccess("Link copied to clipboard");
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleDelete(id: any) {

    deleteJob(id).then(({ data }) => {
      if (!data.error) {
        notifySuccess(`Job deleted successfully`);
      } else {
        notifyError(`Something went wrong`);
      }

      window.location.reload()
    })
  }

  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="dropdown-item" href={`/job/${jobpost.id}`}>
            <Image src={view} alt="icon" className="lazy-img" /> View
          </a>
        </li>
        <li>
          <a className="dropdown-item" href={`/dashboard/consultant-dashboard/submit-job/${jobpost.id}`}>
            <Image src={edit} alt="icon" className="lazy-img" /> Edit
          </a>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleCopy}>
            <Image src={share} alt="icon" className="lazy-img" /> Share
          </button>
        </li>
        <li>
          <a href="#"
            data-bs-toggle="modal"
            data-bs-target="#deleteJobModal"
            className="dropdown-item " >
            <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
          </a>
        </li>


      </ul>
      <DeleteJobModal deleteHandler={() => handleDelete(jobpost.id)} />
    </>

  );
};

export default ActionDropdownConsultant;
