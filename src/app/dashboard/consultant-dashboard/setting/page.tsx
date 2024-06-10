'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import DashboardSettingArea from '@/app/components/dashboard/candidate/dashboard-setting';
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';

const EmployDashboardSettingPage = () => {
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

      {/* dashboard area start */}
      <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar}/>
      {/* dashboard area end */}
    </div>
    </Wrapper>
  );
};

export default EmployDashboardSettingPage;