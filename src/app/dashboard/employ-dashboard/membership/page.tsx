'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import EmployMembershipArea from "@/app/components/dashboard/employ/membership-area";
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';

const EmployDashboardMembershipPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
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
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* membership area start */}
       <EmployMembershipArea setIsOpenSidebar={setIsOpenSidebar}/>
        {/* membership area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardMembershipPage;
