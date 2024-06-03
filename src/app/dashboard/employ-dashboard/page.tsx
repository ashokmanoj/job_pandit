import React from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployDashboardMain from '@/app/components/dashboard/employ';
import { getRole } from '@/hooks/user/getRole';
import { redirect } from 'next/navigation';
import { fetchCompany, fetchCompanyDashboard } from '@/hooks/server-request/company';
import { createClient } from '@/utils/supabase/server';

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
 
const company = await fetchCompanyDashboard();
console.log(company);

if (!company) {
  redirect('/dashboard/employ-dashboard/profile');
}

  return (
    <Wrapper>
      <EmployDashboardMain />
    </Wrapper>
  );
};

export default EmployDashboardPage;