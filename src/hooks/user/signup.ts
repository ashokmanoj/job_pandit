import { createClient } from "@/utils/supabase/client";


export default async function singup(formData: {
  email: string;
  password: string;
}) {
  const supabase = createClient();
  const {  error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
    emailRedirectTo:`${location.origin}/confirm-role`
    }
  });
  return  error;
}
