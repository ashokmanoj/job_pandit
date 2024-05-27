import React from 'react';
import Wrapper from '@/layouts/wrapper';
import CandidateDashboardMain from '@/app/components/dashboard/candidate';
import { redirect } from 'next/navigation';
import { getRole } from '@/hooks/user/getRole';


const CandidateDashboardPage = async () => {
 const role = await getRole();
 if (!role) {
   redirect('/register');
 }else if( role ==='user'){
   redirect('/confirm-role');
 }else if( role !=='candidate'){
   redirect('/');
 }

 
  return (
    <Wrapper>
      <CandidateDashboardMain />
    </Wrapper>
  );
};

export default CandidateDashboardPage;