import { createClient } from "@/utils/supabase/client";

export const fetchJobs = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('job_posts')
      .select('*').order('created_at', { ascending: false });
  const companies = await supabase.from('employer_profile').select('*'); 
  const result = data?.map((d: any) => ({ ...d, company: companies?.data?.find((p: any) => p.id === d.user_id) }));
  console.log(result);
  if(error || companies?.error) {
    return [];
  }
    return  result;
  }

  export const deleteJob = async (id: number) => {
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
      .from('job_posts')
      .delete()
      .eq('id', id).eq('user_id', userId).select('*').single();
    console.log(error,data,"error in delete job");
    return { data, error };  
  }