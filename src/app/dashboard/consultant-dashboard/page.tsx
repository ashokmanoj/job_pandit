import React from 'react';
import Wrapper from '@/layouts/wrapper';
import ConsultantDashboardMain from '@/app/components/dashboard/consultant';
import { getRole } from '@/hooks/user/getRole';
import { redirect } from 'next/navigation';
import { fetchCompanyDashboard } from '@/hooks/server-request/company';

const EmployDashboardPage = async () => {
  const role = await getRole();
  console.log(role);
 if (!role) {
   redirect('/register');
 }else if( role ==='user'){
   redirect('/confirm-role');
 }else if( role !=='consultant'){
   redirect('/');
 }
 
const consultant = await fetchCompanyDashboard();
console.log(consultant);

if (!consultant) {
  redirect('/dashboard/consultant-dashboard/profile');
}

  return (
    <Wrapper>
      <ConsultantDashboardMain />
    </Wrapper>
  );
};

export default EmployDashboardPage;