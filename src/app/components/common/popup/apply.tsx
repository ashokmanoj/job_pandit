import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";
import { ApplyJob } from "@/hooks/client-request/job";
import { useUserStore } from "@/lib/store/user";
import { notifyError, notifySuccess } from "@/utils/toast";
import { fetchMyApplications } from "@/hooks/client-request/application";



const ApplyModel = ({ job_id }: { job_id: number }) => {
  const { user } = useUserStore();


  async function handleApply() {
    console.log(job_id);
    if (user?.id) {
      const { error } = await ApplyJob(job_id, user?.id);
      if (!error) {
        notifySuccess("Job Applied Successfully");
        window.location.reload();
      }
      else if (error.code == '23505') {
        console.log(error);
        notifyError("Already Applied");
        window.location.reload();
      } else {
        console.log(error);
        notifyError("Something went wrong");
        window.location.reload();
      }
    }
  }

  

  return (
    <div
      className="modal fade"
      id="applyModel"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="remove-account-popup text-center modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            ><i className="bi bi-x-lg"></i>
            </button>
            <div>

              <h3 >Apply for this job</h3>
              <p>
                If you apply for this job, you will be notified by email.
                <span className="alert-text">(No Cancellations)</span>
              </p>
              <div className="row align-items-center justify-content-center gap-20 px-30">
                <div className="col-4">
                  
                    <button
                      type="button"
                      className="btn-four w-100"
                      onClick={handleApply}
                    >
                      Apply
                    </button>
                
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className="btn-three w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModel;
