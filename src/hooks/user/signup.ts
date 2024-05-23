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
    emailRedirectTo: process.env.NEXT_REDIRECT_URL || "http://localhost:3000/confirm-role",
    
    }
    
  });
  return  error;
}
