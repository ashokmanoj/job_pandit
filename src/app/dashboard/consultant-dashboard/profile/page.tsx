'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import ConsultantProfileArea from '@/app/components/dashboard/consultant/profie-area';
import ConsultantAside from '@/app/components/dashboard/consultant/aside';
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';


const ConsultantDashboardProfilePage = () => {
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
      <ConsultantAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* profile area start */}
      <ConsultantProfileArea setIsOpenSidebar={setIsOpenSidebar}/>
      {/* profile area end */}
    </div>
    </Wrapper>
  );
};

export default ConsultantDashboardProfilePage;