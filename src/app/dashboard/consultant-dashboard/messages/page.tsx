'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import DashboardMessage from '@/app/components/dashboard/candidate/dashboard-message';
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';
import EmployAside from '@/app/components/dashboard/consultant/aside';

const EmployDashboardMessagesPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  const router= useRouter();
  useEffect(() => {
    async function verfiyRole(){
      const role = await getRole();
      if (!role) {
        router.push('/register');
      }else if( role ==='user'){
        router.push('/confirm-role');
      }else if( role !=='consultant'){
        router.push('/');
      }
     }
     verfiyRole()
    },[])
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