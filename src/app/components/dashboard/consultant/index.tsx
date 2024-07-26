'use client'
import React, { useState } from 'react';
import ConsultantAside from '../consultant/aside';
import ConsultantDashboardArea from '../consultant/dashboard_area';

const ConsultantDashboardMain = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);

  return (
    <div className='main-page-wrapper'>
      {/* aside start */}
      <ConsultantAside  isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      {/* aside end  */}

      {/* dashboard area start */}
      <ConsultantDashboardArea setIsOpenSidebar={setIsOpenSidebar} />
      {/* dashboard area end */}
    </div>
  );
};

export default ConsultantDashboardMain;