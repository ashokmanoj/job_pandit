'use client'
import React, { useEffect, useState } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/consultant/aside";
import SubmitJobArea from "@/app/components/dashboard/consultant/submit-job";
import { useRouter } from "next/navigation";
import { getRole } from "@/hooks/client-request/getRole";

const EmployDashboardSubmitJobPage = ({ params }: { params: any }) => {
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

  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* submit job area start */}
        <SubmitJobArea setIsOpenSidebar={setIsOpenSidebar} params = {params}/>
        {/* submit job area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardSubmitJobPage;
