"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import singup from "@/hooks/user/signup";
import { notifyError , notifySuccess} from "@/utils/toast";



// form data type
type IFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  checkbook: boolean;

};

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string().required().min(6).label("Confirm Password"),
  checkbook: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});
// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "This email is required",
          },
        }
      : !values.password
      ? {
          password: {
            type: "required",
            message: "This password is required",
          },
        }
      : !values.confirmPassword
      ? {
          confirmPassword: {
            type: "required",
            message: "This confirm password is required",
          },
        }
      : values.password !== values.confirmPassword
      ? {
          confirmPassword: {
            type: "required",
            message: "Passwords do not match",
          },
        }
      : !values.checkbook
      ? {
          checkbook: {
            type: "required",
            message: "You must accept the terms and conditions",
          },
        }
      : {},
  };
};

const RegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = async (formData: IFormData) => {
    setIsUploading(true);
    try {
  
      const error  = await singup(formData);
      console.log( error);
      if(error){
        notifyError("Something went wrong. Please try again");
        reset();
        setIsUploading(false);
        
        return;
      }
      notifySuccess("Go to email and Verify Your Email");
    reset();
  }catch (error) {
    console.log(error);
       reset();
       
    notifyError("Something went wrong. Please try again");
  
};
setIsUploading(false);
};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Confirm Password*</label>
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter confirm Password"
              className="pass_log_id"
              {...register("confirmPassword", { required: `Confirm Password is required!` })}
              name="confirmPassword"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.confirmPassword?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                id="remember3"
                {...register("checkbook", { required: `You must accept the terms and conditions` })}
                name="checkbook"
              />
              <label htmlFor="remember3">
              {" "} I accept the {" "}
                <a href="#"> Terms conditions</a> &{" "}
                <a href="#">Privacy Policy</a>
              </label>
              <div className="help-block with-errors">
              <ErrorMsg msg={errors.checkbook?.message!} />
            </div>
            </div>
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
              Loading...
            </button>
          ) : (
            <button
              className="btn-eleven fw-500 tran3s d-block mt-20"
              type="submit"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;