"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import avatar from "@/assets/dashboard/images/avatar_03.jpg";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import profile_icon_2 from "@/assets/dashboard/images/icon/icon_24.svg";
import profile_icon_3 from "@/assets/dashboard/images/icon/icon_25.svg";
import logout from "@/assets/dashboard/images/icon/icon_9.svg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_39.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_39_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";
import nav_9 from "@/assets/dashboard/images/icon/icon_40.svg";
import nav_9_active from "@/assets/dashboard/images/icon/icon_40_active.svg";
import nav_8 from "@/assets/dashboard/images/icon/icon_8.svg";
import LogoutModal from "../../common/popup/logout-modal";
import DeleteModal from "../../common/popup/delete-modal";
import { useUserStore } from "@/lib/store/user";
import { fetchCompany } from "@/hooks/client-request/company";
import SessionProvider from "@/ui/session-provider";

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
    {
      id: 1,
      icon: nav_1,
      icon_active: nav_1_active,
      link: "/dashboard/consultant-dashboard",
      title: "Dashboard",
    },
    {
      id: 2,
      icon: nav_2,
      icon_active: nav_2_active,
      link: "/dashboard/consultant-dashboard/profile",
      title: "My Profile",
    },
    {
      id: 3,
      icon: nav_3,
      icon_active: nav_3_active,
      link: "/dashboard/consultant-dashboard/jobs",
      title: "My Jobs",
    },
    {
      id: 5,
      icon: nav_5,
      icon_active: nav_5_active,
      link: "/dashboard/consultant-dashboard/submit-job/new",
      title: "Submit Job",
    },
    {
      id: 6,
      icon: nav_6,
      icon_active: nav_6_active,
      link: "/dashboard/consultant-dashboard/saved-candidate",
      title: "Saved Candidate",
    },
    // {
    //   id: 7,
    //   icon: nav_9,
    //   icon_active: nav_9_active,
    //   link: "/dashboard/employ-dashboard/membership",
    //   title: "Membership",
    // },
    {
      id: 8,
      icon: nav_7,
      icon_active: nav_7_active,
      link: "/dashboard/consultant-dashboard/setting",
      title: "Account Settings",
    },
  ];
// props type 
type IProps = {
  isOpenSidebar: boolean,
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>

}
const ConsultantAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
  const {user,setUser} = useUserStore();
  const [company,setCompany] = useState<any>({});
  

  
  useEffect(() => {
    if(user?.id){
      fetchCompany({id:user?.id}).then(({data,error})=>{
        console.log(data,error,"consultant");
        setCompany(data);
      })
    } 
  },[user])
  const pathname = usePathname();
  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? 'show' : ''}`}>
        <div className="position-relative">
          <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
          {!company &&<div className="alert alert-danger fs-14" role="alert">
                Profile is required. <a href="/dashboard/consultant-dashboard/profile" className="alert-link">Create Here</a>.
              </div>}
            <button className="close-btn d-block d-md-none" onClick={() => setIsOpenSidebar(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="user-data">
            <div className="user-avatar online position-relative rounded-circle">
            <Image src={company?.avatar?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${company?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{objectFit:"cover", width:"100%", height:"100%"}} width={60} height={60} />
            </div>
            <div className="user-name-data">
              <button
                className="user-name dropdown-toggle px-3 text-wrap"
                type="button"
                id="profile-dropdown"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                {company? company?.company_name:user?.first_name}
                ({user?.last_name})
              </button>
              
              <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href={`/company/${company?.id}`}
                  >
                    <Image src={profile_icon_1} alt="icon" className="lazy-img" />
                    <span className="ms-2 ps-1">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="/dashboard/consultant-dashboard/profile"
                  >
                    <Image src={profile_icon_2} alt="icon" className="lazy-img" />
                    <span className="ms-2 ps-1">Account Settings</span>
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <Image src={profile_icon_3} alt="icon" className="lazy-img" />
                    <span className="ms-2 ps-1">Notification</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <nav className="dasboard-main-nav">
            <ul className="style-none">
              {nav_data.map((m) => {
                const isActive = pathname === m.link;
                return (
                  <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                    <Link
                      href={m.link}
                      className={`d-flex w-100 align-items-center ${isActive ? "active" : ""}`}
                    >
                      <Image
                        src={isActive ? m.icon_active : m.icon}
                        alt=""
                        className="lazy-img"
                      />
                      <span>{m.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="#"
                  className="d-flex w-100 align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <Image src={nav_8} alt="icon" className="lazy-img" />
                  <span>Delete Account</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="profile-complete-status">
            <div className="progress-value fw-500">87%</div>
            <div className="progress-line position-relative">
              <div className="inner-line" style={{ width: "80%" }}></div>
            </div>
            <p>Profile Complete</p>
          </div>

          <a href="#"
            className="d-flex w-100 align-items-center logout-btn"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal">
            <Image src={logout} alt="icon" className="lazy-img" />
            <span>Logout</span>
          </a>
        </div>
      </aside>
      {/* LogoutModal star */}
      <LogoutModal />
      <DeleteModal />
    
      {/* LogoutModal end */}
    </>
  );
};

export default ConsultantAside;
