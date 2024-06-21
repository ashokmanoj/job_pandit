import { createClient } from "@/utils/supabase/client";

export const fetchJobs = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('job_posts')
      .select('*').order('created_at', { ascending: false });
  const companies = await supabase.from('employer_profile').select('*'); 
  const result = data?.map((d: any) => ({ ...d, company: companies?.data?.find((p: any) => p.id === d.user_id) }));
  console.log(result,"result in fetch jobs client");
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

export   const  ApplyJob  = async (job_id:number,candidate_id:string)=>{
  const supbase = createClient();
 const { error } = await supbase.from('job_applications').insert([
    {
      "jobpost_id": job_id,
      "candidate_id": candidate_id,
    }
  ])

  return {error };
}

export const fetchMyAppliedJobsByIds = async (job_ids: number[]) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('job_posts')
    .select('*').in('id', job_ids);
    console.log(data,error,"data in fetchMyAppliedJobsByIds");
  return { data, error };

}