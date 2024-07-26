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
  if(!role){
    redirect('/register');
  }
  if(role==='candidate'){
    redirect('/dashboard/candidate-dashboard/');
  }
  if(role==='company'){
    redirect('/dashboard/employ-dashboard/');
  }
  if(role === 'consultant'){
    redirect('/dashboard/consultant-dashboard/');
  }
 if(role !=='user'){
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
