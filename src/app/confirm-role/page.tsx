import React from "react";
import { Metadata } from "next";

import Wrapper from "@/layouts/wrapper";
import UserRoleForm from "../components/forms/user-role";
import UserRoleConfirmation from "../components/register/user_role_confirmation";


export const metadata: Metadata = {
  title: "Confirm Role",
};

const ConfirmRolePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
      <UserRoleConfirmation/>
      </div>
    </Wrapper>
  );
};

export default ConfirmRolePage;
