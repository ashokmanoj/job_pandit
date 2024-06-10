'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import CandidateAside from '@/app/components/dashboard/candidate/aside';
import DashboardResume from '@/app/components/dashboard/candidate/dashboard-resume';
import { getRole } from '@/hooks/client-request/getRole';
import { useRouter } from 'next/navigation';

const CandidateDashboardResumePage = () => {
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

    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* Resume area start */}
      <DashboardResume setIsOpenSidebar={setIsOpenSidebar}/>
      {/* Resume area end */}
    </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;