import { createClient } from "@/utils/supabase/server";

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
  export const fetchJob = async (id:number) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('job_posts')
      .select('*').eq('id',id).single();
  const companies = await supabase.from('employer_profile').select('*').eq('id', data?.user_id).single(); 
  const result = { ...data, company: companies?.data };
  console.log(result);
  if(error || companies?.error) {
    return  null;
  }
    return  result;
  } 