import { createClient } from "@/utils/supabase/client";


export default async function singup(formData: {
  email: string;
  password: string;
  role: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });


  const user_id = data.user?.id;
  

  if (data.user) {
    const supabaseAdmin = createClient();
    const { data, error } = await supabaseAdmin
      .from("user_role")
      .insert({ id: user_id, role: formData.role,email:formData.email })
      .select();
      return error;
  }

  return  error;
}
