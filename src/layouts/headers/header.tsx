"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menus from "./component/menus";
import logo from "@/assets/images/logo/logo_01.png";
import CategoryDropdown from "./component/category-dropdown";
import LoginModal from "@/app/components/common/popup/login-modal";
import useSticky from "@/hooks/use-sticky";
import { createClient } from "@/utils/supabase/client";

const Header =  ({}) => {
  const { sticky } = useSticky();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      if (user.data.user !== null) {
        setIsUser(true);
      }
    };
    fetchUser();
  }, [isUser]);

  return (
    <>
    <header className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${sticky?'fixed':''}`}>
      <div className="inner-content position-relative">
        <div className="top-header">
          <div className="d-flex align-items-center">
            <div className="logo order-lg-0">
              <Link href="/" className="d-flex align-items-center">
                <Image src={logo} alt="logo" priority />
              </Link>
            </div>
            <div className="right-widget ms-auto order-lg-3">
              <ul className="d-flex align-items-center style-none">
                <li><Link href="/dashboard/candidate-dashboard" className="login-btn-one">
                   Post Job
                  </Link>
                  
                </li>
                <li className="d-none d-md-block ms-4">
                  {isUser ?  <Link href="/dashboard/candidate-dashboard" className="btn-one">
                   DashBoard
                  </Link> :<a
                    href="#"
                    className="login-btn-one"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >Login
                  </a> }
                </li>
              </ul>
            </div>
            <nav className="navbar navbar-expand-lg p0 ms-lg-5 ms-3 order-lg-2">
              <button
                className="navbar-toggler d-block d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav align-items-lg-center">
                  <li className="d-block d-lg-none">
                    <div className="logo">
                      <Link href="/" className="d-block">
                        <Image src={logo} alt="logo" width={100} priority />
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown category-btn mega-dropdown-sm">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      <i className="bi bi-grid-fill"></i> Category
                    </a>
                    {/* CategoryDropdown start */}
                    <CategoryDropdown />
                    {/* CategoryDropdown end */}
                  </li>
                  {/* menus start */}
                  <Menus />
                  {/* menus end */}
                 
                  <li className="d-md-none">
                    {}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>

    {/* login modal start */}
    <LoginModal/>
    {/* login modal end */}
    </>
  );
};

export default Header;
