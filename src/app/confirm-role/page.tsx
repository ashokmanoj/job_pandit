import React from "react";
import { Metadata } from "next";

import Wrapper from "@/layouts/wrapper";
import UserRoleConfirmation from "../components/register/user_role_confirmation";
import { getRole } from "@/hooks/user/getRole";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Confirm Role",
};

const ConfirmRolePage = async () => {
  const role = await getRole();
  if (!role) {
    redirect('/register');
  }else if( role ==='user'){
    redirect('/confirm-role');
  }{
    redirect('/');
  }

  return (
    <Wrapper>
      <div className="main-page-wrapper">
      <UserRoleConfirmation/>
      </div>
    </Wrapper>
  );
};

export default ConfirmRolePage;
