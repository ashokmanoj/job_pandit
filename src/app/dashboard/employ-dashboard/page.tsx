import React from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployDashboardMain from '@/app/components/dashboard/employ';
import { getRole } from '@/hooks/user/getRole';
import { redirect } from 'next/navigation';

const EmployDashboardPage = async () => {
  const role = await getRole();
  console.log(role);
 if (!role) {
   redirect('/register');
 }else if( role ==='user'){
   redirect('/confirm-role');
 }else if( role !=='company'){
   redirect('/');
 }
  return (
    <Wrapper>
      <EmployDashboardMain/>
    </Wrapper>
  );
};

export default EmployDashboardPage;