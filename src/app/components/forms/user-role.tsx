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
    countryCode: string;
    phoneNumber: string; // Optional field for OTP
};

// schema
const schema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    countryCode: Yup.string().required().label("Country Code"),
    phoneNumber: Yup.string().required().min(6).label("Phone Number"),
});

// resolver
const resolver: Resolver<IFormData> = async (values) => {
    const errors: any = {};
    if (!values.firstName) {
        errors.firstName = {
            type: "required",
            message: "First Name is required.",
        };
    }
    if (!values.lastName) {
        errors.lastName = {
            type: "required",
            message: "Last Name is required.",
        };
    }
    if (!values.countryCode) {
        errors.countryCode = {
            type: "required",
            message: "Country Code is required.",
        };
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = {
            type: "required",
            message: "Phone Number is required.",
        };
    }
    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors: errors,
    };
};

const UserRoleForm = () => {
    const [user, setUser] = useState<any>({});
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState<string>('');
    const [userOtp, setUserOtp] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(0); // State to track user entered OTP [Optional] // State to track OTP sent status
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            setUser(data.user);

            if (error) {
                notifyError(error.message);
                router.push("/register");
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
        watch,
    } = useForm<IFormData>({ resolver });

    // Function to send OTP
    const generateAndSendOtp = async (countryCode: string, phoneNumber: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ countryCode, phoneNumber }),
            });

            // Check if response is not empty
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setOtp(data.otp);
                    notifySuccess("OTP sent successfully");
                    setOtpSent(true);
                    setCountdown(60);
                } else {
                    notifyError(data.error || "Failed to send OTP");
                }
            } else {
                notifyError("Failed to send OTP");
            }
        } catch (error) {
            notifyError("An error occurred while sending OTP");
            console.error("Error sending OTP:", error);
        }
        setIsLoading(false);
    };
    const resendOtp = async () => {
        setOtpSent(false)
        generateAndSendOtp(watch("countryCode"), watch("phoneNumber"));
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    // on submit
    const onSubmit = async (formData: IFormData) => {
        setIsUploading(true);
        if (otp === userOtp) {
            if (user) {
                const { data, error } = await supabase
                    .from("user_role")
                    .update(
                        {
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            phone_number: `${formData.countryCode}${formData.phoneNumber}`,
                            role: "candidate",
                        }
                    ).eq("id", user.id).select();
                console.log(data, error);
                if (error) {
                    notifyError(error.message);
                } else {
                    notifySuccess("User added successfully");
                   
                    reset();
                    setIsLoading(false);
                    setOtpSent(false);
                    setCountdown(0);
                    setOtp('');
                    setUserOtp('');
                    setIsUploading(false);
                    router.push("/dashboard/candidate-dashboard/profile");
                }
            } else {
                notifyError("Something went wrong. Please try again");
            }
        } else {
            notifyError("Invalid OTP");
            setIsUploading(false);
            return
        }
        reset();
        setIsLoading(false);
        setOtpSent(false);
        setCountdown(0);
        setOtp('');
        setUserOtp('');
        setIsUploading(false);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-12">
                    <div className="input-group-meta position-relative mb-25">
                        <label htmlFor="firstName">First Name*</label>
                        <input
                            type="text"
                            placeholder="First Name*"
                            {...register("firstName", { required: "First Name is required!" })}
                            name="firstName"
                        />
                        <div className="help-block with-errors">
                            <ErrorMsg msg={errors.firstName?.message!} />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group-meta position-relative mb-25">
                        <label htmlFor="lastName">Last Name*</label>
                        <input
                            type="text"
                            placeholder="Last Name*"
                            {...register("lastName", { required: "Last Name is required!" })}
                            name="lastName"
                        />
                        <div className="help-block with-errors">
                            <ErrorMsg msg={errors.lastName?.message!} />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group-meta position-relative mb-25">
                        <label htmlFor="countryCode">Country Code*</label>
                        <input
                            type="text"
                            placeholder="+91"
                            {...register("countryCode", { required: "Country Code is required!" })}
                            name="countryCode"
                        />
                        <div className="help-block with-errors">
                            <ErrorMsg msg={errors.countryCode?.message!} />
                        </div>
                    </div>
                </div>
                <div className="col-9 ">
                    <div className="input-group-meta position-relative mb-25 ">
                        <label htmlFor="phoneNumber">Phone Number*</label>
                        <input
                            type="text"
                            placeholder="Phone Number*"
                            {...register("phoneNumber", { required: "Phone Number is required!" })}
                            name="phoneNumber"
                        />

                        <div className="help-block with-errors">
                            <ErrorMsg msg={errors.phoneNumber?.message!} />
                        </div>
                        <div className="position-absolute top-50 end-0 translate-middle-y z-1 ">
                            {otpSent ? <div className="pr-10">

                                <button
                                    type="button"
                                    className="btn-nine fw-500 tran3s d-block btn-margin "
                                    onClick={() => resendOtp()}
                                    disabled={countdown > 0}
                                >
                                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                                </button>
                            </div> :
                                <div className="w-100 pr-20">
                                    {isLoading ? <><button type="button" className="btn-nine fw-500 tran3s d-block btn-margin" disabled ><span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span></button></> : <><button type="button" className="btn-nine fw-500 tran3s d-block  btn-margin " onClick={() => generateAndSendOtp(watch("countryCode"), watch("phoneNumber"))}>Get OTP</button></>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group-meta position-relative mb-25">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={userOtp}
                            onChange={(e) => setUserOtp(e.target.value)}
                            name="otp"
                        />
                        <div className="help-block with-errors">
                            {/* error */}
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
                        </button>
                    ) : (
                        <button
                            className="btn-eleven fw-500 tran3s d-block mt-20"
                            type="submit"
                        >
                            Submit
                        </button>
                    )}
                </div>
                <div className="col-12">
                    <p className="info-text text-center">You can't change role after creating account</p>
                </div>
            </div>
        </form>
    );
};

export default UserRoleForm;
