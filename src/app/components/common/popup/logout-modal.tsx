import React from "react";
import Image from "next/image";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/user";


const LogoutModal = () => {
  const {setUser} = useUserStore();
   const router = useRouter();
  function logOut(){
    const supbase = createClient();
    supbase.auth.signOut();
    setUser(undefined);
    document.getElementById('closeBtn-log')?.click();
    router.push('/');
    
  }
  return (
    <div
      className="modal fade"
      id="logoutModal"
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
            ></button>
            <Image src={icon} alt="icon" className="lazy-img m-auto" />
            <h2>Are you sure?</h2>
            <p>Are you sure to Logout your account?</p>
            <div className="button-group d-inline-flex justify-content-center align-items-center pt-15">
              <a href="#" onClick={logOut} className="confirm-btn fw-500 tran3s me-3">
                Yes
              </a>
              <button
                type="button"
                id="closeBtn-log"
                className="btn-close fw-500 ms-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
