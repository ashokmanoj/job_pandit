import { createClient } from "@/utils/supabase/client";

export const getRole = async () => {
    const supabase = createClient();
    const { data} = await supabase.auth.getUser();
    const role = await supabase.from('user_role').select('role').eq('id', data.user?.id).single();
    return role.data?.role;
}