'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import JobAlertArea from "@/app/components/dashboard/candidate/job-alert-area";
import { redirect } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';

const CandidateProfileJobAlertPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  useEffect(() => {
  async function verfiyRole(){
    const role = await getRole();
    if (!role) {
      redirect('/register');
    }else if( role ==='user'){
      redirect('/confirm-role');
    }else if( role !=='candidate'){
      redirect('/');
    }
   }
   verfiyRole()
  },[])
 
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
        {/* aside end  */}

        {/* job alert area start */}
        <JobAlertArea  setIsOpenSidebar={setIsOpenSidebar} />
        {/* job alert area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateProfileJobAlertPage;
