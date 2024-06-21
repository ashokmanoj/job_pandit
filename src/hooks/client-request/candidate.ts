import { createClient } from '@/utils/supabase/client';

export const fetchCandidate = async ({ candidateId} :{  candidateId: string}) => {
  if (!candidateId) return { resume: null, profile: null };
    const supabase = createClient();
    const { data, error } = await supabase
      .from('candidate_profile')
      .select('*').eq('id', candidateId).single();
  
    console.log(data, error)
   
    return { profile: data };
  }
  export const fetchCandidates = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('candidate_profile')
      .select('*');
  
 console.log(data, error);
    return  data;
  }

  export const fetchCandidatesDash = async (user_id:string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from(`candidate_profile`)
      .select(`*,job_applications(*)`).eq('id', user_id).single();
  
   console.log(data, error,"data in dash");
    return  data;
  }

