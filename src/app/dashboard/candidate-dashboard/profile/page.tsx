'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import CandidateAside from '@/app/components/dashboard/candidate/aside';
import DashboardProfileArea from '@/app/components/dashboard/candidate/dashboard-profile-area';
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';


const CandidateProfilePage = () => {
  const router= useRouter();
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
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

      {/* profile area start */}
      <DashboardProfileArea setIsOpenSidebar={setIsOpenSidebar}/>
      {/* profile area end */}
    </div>
    </Wrapper>
  );
};

export default CandidateProfilePage;