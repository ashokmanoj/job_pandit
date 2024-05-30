"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useUserStore } from "@/lib/store/user";



// form data type
type IFormData = {
  email: string;
  password: string;
}


// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required.",
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

const LoginForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const supabase = createClient();
  const router = useRouter();
  const { setUser } = useUserStore();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = async (formData: IFormData) => {
    try {
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        notifyError(error.message);
        return;
      }
        
        notifySuccess("Login Successful");
        const userData = await supabase.from('user_role').select('*').eq('id',data.session?.user.id).single();
       setUser(userData.data); 
       document.getElementById("closeBtn")?.click();
      router.refresh();
       router.push('/');

    } catch (error:any) {
      notifyError(error.message);
    }
    reset();
  };
  async function handlePasswordRest(){
    if(watch('email')){
      const { data, error } = await supabase.auth.resetPasswordForEmail(watch('email'), {
        redirectTo: 'http://localhost:3000/reset-password',
      })

      if (error) {  
        notifyError(error.message);
        return
      }else{
        notifySuccess('Password reset link sent to your email');
      }
    }else{
      notifyError('Please Enter Email');
      return
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              {...register("email", { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter Password"
              className="pass_log_id"
              {...register("password", { required: `Password is required!` })}
              name="password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <Image src={icon} alt="icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <a className="cursor-pointer" onClick={handlePasswordRest}>Forgot Password?</a>
          </div>
        </div>
        <div className="col-12">
          {isUploading ? (
            <button
              className="btn-eleven fw-500 tran3s d-block mt-20"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button
              className="btn-eleven fw-500 tran3s d-block mt-20"
              type="submit"
            >
              Login
            </button>
            )}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
