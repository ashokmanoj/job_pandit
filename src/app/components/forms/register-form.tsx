"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import { createClient } from "@/utils/supabase/client";
import singup from "@/hooks/user/signup";


// form data type
type IFormData = {
  name: string;
  email: string;
  password: string;
};

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
        name: {
          type: "required",
          message: "Name is required.",
        },
        email: {
          type: "required",
          message: "Email is required.",
        },
        password: {
          type: "required",
          message: "Password is required.",
        }
      }
      : {},
  };
};

const RegisterForm = ( { isCandidate }: { isCandidate: boolean }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [confirm, setConfirm] = useState<any>(null);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = async (formData: IFormData) => {
    setError(null);
    setConfirm(null);
    if (formData) {
      const sendData = {...formData,role: isCandidate?"candidate":"employer"}
      const {data, error } = await singup(sendData);
      console.log(data, error);
      if(error){
        setError(error);
      }
      if(data.user){
        setConfirm("Check your email to confirm your account");
      }
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Name*</label>
            <input
              type="text"
              placeholder="James Brower"
              {...register("name", { required: `Name is required!` })}
              name="name"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.name?.message!} />
            </div>
          </div>
        </div>
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
                <Image src={icon} alt="pass-icon" />
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
              <input
                type="checkbox"
                name="remember"
              />
              <label htmlFor="remember">
                By hitting the Register button, you agree to the{" "}
                <a href="#">Terms conditions</a> &{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn-eleven fw-500 tran3s d-block mt-20">
            Register
          </button>
          {error && <div className="alert alert-danger text-center mt-20 "><ErrorMsg msg={error.message} /></div>}
          {confirm && <div className="alert alert-success text-center mt-20 text-green-500 "><ErrorMsg msg={confirm} /></div>}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;


