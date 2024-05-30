import { createClient } from '@/utils/supabase/client';

export const fetchCandidate = async ({ candidateId} :{  candidateId: string}) => {
  if (!candidateId) return { resume: null, profile: null };
    const supabase = createClient();
    const { data, error } = await supabase
      .from('candidate_resume_details')
      .select('*').eq('user_id', candidateId).single();
  
    console.log(data, error)
    const prof = await supabase.from('candidate_profile').select('*').eq('id', candidateId).single();

    return { resume:data, profile: prof.data };
  }
  export const fetchCandidates = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('candidate_profile')
      .select('*')
  
 
    const resume = await supabase.from('candidate_resume_details').select('*');

    const result = data?.map((d: any) => ({ ...d, resume: resume?.data?.find((p: any) => p.user_id === d.id) }));

    return  result;
  }