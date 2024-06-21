import { createClient } from "@/utils/supabase/client";

export const fetchLikes = async (candidateId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('likes')
        .select('*').eq('liker_id', candidateId);
return { data, error };

}
export const fetchLike = async (candidateId: string, company_id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('likes')
        .select('*').eq('liker_id', candidateId).eq('likedby_id', company_id).single();

    return { data, error };
}

export const createLike = async (candidateId: string, company_id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('likes')
        .insert([
            {
                "liker_id": candidateId,
                "likedby_id": company_id,
            }
        ]).select('*').single();
    
   return { data, error };
}

export const deleteLike = async (candidateId: string, company_id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('likes')
        .delete()
        .eq('liker_id', candidateId).eq('likedby_id', company_id).select('*').single();

    return {data, error};
}