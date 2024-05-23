import { createClient } from "@/utils/supabase/client";


export const signUpGoogle = async (isCandidate: boolean) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/confirm-role'
        }
      })
     if(isCandidate ){
        const { data } = await supabase.auth.getUser();
        const { error } = await supabase.from("user_role").insert({
            id: data.user?.id,
            role: "candidate",
            email: data.user?.email,
            name: data.user?.user_metadata.full_name
        })
     }else{
        const { data } = await supabase.auth.getUser();
        const { error } = await supabase.from("user_role").insert({
            id: data.user?.id,
            role: "employer",
            email: data.user?.email,
            name: data.user?.user_metadata.full_name
        })

     }

}

