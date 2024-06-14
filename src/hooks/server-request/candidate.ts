import { createClient } from '@/utils/supabase/server';

export const fetchCandidate = async ({ candidateId} :{  candidateId: string}) => {
  if (!candidateId) return { resume: null, profile: null };
    const supabase = createClient();
    const { data, error } = await supabase
      .from('candidate_profile')
      .select('*').eq('id', candidateId).single();
  
    return {profile: data };
  }
  export const fetchCandidates = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('candidate_profile')
      .select('*')
  
console.log(data, error);
    return  data;
  }