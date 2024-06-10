'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import SavedJobArea from "@/app/components/dashboard/candidate/saved-job-area";
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';


const CandidateDashboardSavedJobPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  
  const router= useRouter();
  useEffect(() => {
    async function verfiyRole(){
      const role = await getRole();
      if (!role) {
        router.push('/register');
      }else if( role ==='user'){
        router.push('/confirm-role');
      }else if( role !=='candidate'){
        router.push('/');
      }
     }
     verfiyRole()
    },[])
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* saved job area start */}
        <SavedJobArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* saved job area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSavedJobPage;
