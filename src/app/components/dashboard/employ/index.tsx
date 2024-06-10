'use client'
import React, { useState } from 'react';

import EmployDashboardArea from './dashboard-area';
import EmployAside from '../consultant/aside';

const EmployDashboardMain = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);

  return (
    <div className='main-page-wrapper'>
      {/* aside start */}
      <EmployAside  isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      {/* aside end  */}

      {/* dashboard area start */}
      <EmployDashboardArea setIsOpenSidebar={setIsOpenSidebar} />
      {/* dashboard area end */}
    </div>
  );
};

export default EmployDashboardMain;