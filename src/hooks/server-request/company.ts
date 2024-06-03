import { createClient } from "@/utils/supabase/server";

export const fetchCompanies = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('employer_profile')
      .select(`*,job_posts(*)`);
      
    return data;
  } 
  export const fetchCompany = async (id:number) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('employer_profile')
      .select(`*,job_posts(*)`).eq('id',id).single();

    return  data;
  } 

  
export const fetchCompanyDashboard = async () => {
  const supabase = createClient();
const userId= (await supabase.auth.getUser()).data?.user?.id;
if(userId){
  const {data, error} = await supabase.from('employer_profile').select('*').eq('id',userId).single();
  
  return data;
}

}