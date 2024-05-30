import { createClient } from '@/utils/supabase/server';

export const fetchCandidate = async ({ candidateId} :{  candidateId: string}) => {
  if (!candidateId) return { resume: null, profile: null };
    const supabase = createClient();
    const { data, error } = await supabase
      .from('candidate_resume_details')
      .select('*').eq('user_id', candidateId).single();
  
    const prof = await supabase.from('candidate_profile').select('*').eq('id', candidateId).single();

    return { resume:data, profile: prof.data };
  }
