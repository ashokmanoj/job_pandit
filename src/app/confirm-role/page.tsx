import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";


export const metadata: Metadata = {
  title: "Confirm Role",
};

const ConfirmRolePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        Do Register as Candidate or Employe</div>
    </Wrapper>
  );
};

export default ConfirmRolePage;
