import { createClient } from "@/utils/supabase/client"; 

export const signInGoogle = async () => {
    const supabase = createClient();
    const {data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${location.origin}/confirm-role`,
        }
    })
    console.log(data, error);
}