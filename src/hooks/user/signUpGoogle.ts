import { createClient } from "@/utils/supabase/client";


export const signUpGoogle = async (isCandidate: boolean) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/confirm-role'
        }
      })

      console.log(error)
     

}

