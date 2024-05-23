"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import { createClient } from "@/utils/supabase/client";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";




// form data type
type IFormData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
};


// schema
const schema = Yup.object().shape({
    firstname: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().email().label("Last Name"),
    phoneNumber: Yup.string().required().min(6).label("Phone Number"),

});
// resolver
const resolver: Resolver<IFormData> = async (values) => {
    return {
        values: values.firstName ? values : {},
        errors: !values.firstName ? {
            firstName: {
                type: "required",
                message: "First Name is required.",
            },
            lastName: {
                type: "required",
                message: "Last Name is required.",
            },
            phoneNumber: {
                type: "required",
                message: "Phone Number is required.",
            }
        }
            : {},
    };
};

const UserRoleForm = () => {
   const [user, setUser] = useState<any>({});
   const supabase = createClient();
   const router = useRouter();

useEffect(() => {
    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        setUser(data.user);

        if(error){
            notifyError(error.message);
            // router.push("/register");
            
        }
    };
    getUser();
}, []);




    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormData>({ resolver });
    // on submit
    const onSubmit = async (formData: IFormData) => {

        if(user){
            const { data, error } = await supabase
            .from("user_role")
            .update(
                {   
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone_number: formData.phoneNumber,
                    role:"candidate", 
                },
            ).eq("id", user.id);
            console.log(data, error)
        if (error) {
            notifyError(error.message);
        } else {
            notifySuccess("User added successfully");
    }
        }else{
            notifyError("Something went wrong. Please try again");
        }
};
    return (

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="input-group-meta position-relative mb-25">
                            <label>Name*</label>
                            <input
                                type="text"
                                placeholder="James"
                                {...register("firstName", { required: `First Name is required!` })}
                                name="firstName"
                            />
                            <div className="help-block with-errors">
                                <ErrorMsg msg={errors.firstName?.message!} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="input-group-meta position-relative mb-25">
                            <label>Last Name*</label>
                            <input
                                type="text"
                                placeholder="Brower"
                                {...register("lastName", { required: `Last Name is required!` })}
                                name="lastName"
                            />
                            <div className="help-block with-errors">
                                <ErrorMsg msg={errors.lastName?.message!} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div>
                            <div className="input-group-meta position-relative mb-25">


                            </div>
                            <div className="input-group-meta position-relative mb-25">
                                <label>Phone Number*</label>
                                <input
                                    type="text"
                                    placeholder="9900556677"
                                    {...register("phoneNumber", { required: `Phone Number is required!` })}
                                    name="phoneNumber"
                                />
                                <div className="help-block with-errors">
                                    <ErrorMsg msg={errors.lastName?.message!} />
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-12">
                            <button type="submit" className="btn-eleven fw-500 tran3s d-block mt-20">
                                Create Account
                            </button>

                        </div>
                        <div className="col-12">
                            <p className="info-text text-center">You can't change role after creating account</p>
                        </div>
                    </div>
                </div>
            </form>
    );
};


export default UserRoleForm