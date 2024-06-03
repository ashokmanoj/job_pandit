import { createClient } from "@/utils/supabase/client";

export const fetchCompany = async ({ id }: { id: string}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('employer_profile')
        .select(`*,job_posts(*)`).eq('id', id).single();
        
    return {data,error};
}

export const fetchJobPosts = async ({ id }: { id: string}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('job_posts')
        .select('*').eq('user_id', id).order('created_at', { ascending: false });
        
    return {data,error};
}