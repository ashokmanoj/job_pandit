'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import DashboardMessage from '@/app/components/dashboard/candidate/dashboard-message';
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';

const EmployDashboardMessagesPage = () => {
  const router= useRouter();
  useEffect(() => {
    async function verfiyRole(){
      const role = await getRole();
      if (!role) {
        router.push('/register');
      }else if( role ==='user'){
        router.push('/confirm-role');
      }else if( role !=='company'){
        router.push('/');
      }
     }
     verfiyRole()
    },[])
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* messages area start */}
      <DashboardMessage setIsOpenSidebar={setIsOpenSidebar}/>
      {/* messages area end */}
    </div>
    </Wrapper>
  );
};

export default EmployDashboardMessagesPage;