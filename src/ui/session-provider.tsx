'use client'
import React, { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUserStore } from '@/lib/store/user';

export default function SessionProvider() {
const supabase= createClient();
const setUser = useUserStore((state) => state.setUser)  

    const readUserSession =async () => {
        const {session} = await (await supabase.auth.getSession()).data
        if(session){
            const {data,error} = await supabase.from('user_role').select('*').eq('id',session.user.id).single();
            if(data){
                setUser(data);
            }
        }
    }
     useEffect(() => {
         readUserSession();
         //next-lint-disable-next-line
     },[])
  return (
    <></>
  )
}
