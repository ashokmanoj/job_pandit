'use client'
import React, { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUserStore } from '@/lib/store/user';

export default function SessionProvider() {
const supabase= createClient();
const setUser = useUserStore((state) => state.setUser)  

    const readUserSession =async () => {
        const {data} = await supabase.auth.getSession()
        setUser(data.session?.user);
    }

     useEffect(() => {
         readUserSession();
         //next-lint-disable-next-line
     },[])
  return (
    <></>
  )
}
