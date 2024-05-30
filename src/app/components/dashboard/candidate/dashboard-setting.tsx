'use client'
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/lib/store/user";
import DeleteModal from "../../common/popup/delete-modal";
import Image from "next/image";
import nav_8 from "@/assets/dashboard/images/icon/icon_8.svg";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardSettingArea = ({ setIsOpenSidebar }: IProps) => {
const supabase = createClient();
const {user} = useUserStore();

  const [first_name, setFirstName] = useState(user?.first_name || "");
  const [last_name, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [country_code, setCountryCode] = useState(user?.phone_number.slice(0, 3) || "");
  const [phone_number, setPhone] = useState(user?.phone_number.slice(3, user?.phone_number.length) || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdding,setIsAdding] = useState<boolean>(false);
  const [isPassword,setIsPassword] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string>('');
  const [userOtp, setUserOtp] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);



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
    if (country_code && phone_number) {
      generateAndSendOtp(country_code, phone_number);
    } else {
      notifyError("Please fill out phone number");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);


  async function handlerAdd(e:any) {
    e.preventDefault();
    if (!first_name) {
      notifyError('Please Enter First Name')
      return;
    } else if (!last_name) {
      notifyError('Please Enter Last Name')
      return;
    } else if (!email) {
      notifyError('Please Enter Email')
      return;
    } else if (!phone_number) {
      notifyError('Please Enter Phone Number')
      return;
    }else if(!userOtp){
      notifyError('Please Enter OTP')
      return;
    }else{
      setIsAdding(true);
      if(userOtp === otp){
       if(user){
        const { data, error } = await supabase
        .from("user_role")
        .update(
            {
                first_name,
                last_name,
                phone_number,
                email
            }
        ).eq("id",user?.id).select();
    console.log(data, error);
    if (error) {
        notifyError(error.message);
    } else {
        notifySuccess("User Updated successfully");
        setIsLoading(false);
        setOtpSent(false);
        setCountdown(0);
        setOtp('');
        setUserOtp('');
    }
       }
      }else{
        notifyError('Invalid OTP')
      }
    }

setIsAdding(false);
  }

  function handleSendOTP() {
    if (!country_code || !phone_number) {
      notifyError("Please fill Out phone Number");
      return;
    }
    generateAndSendOtp(country_code, phone_number);
  }
  async function handlePasswordRest(){
    setIsPassword(true);
    if(user?.email){
      const { data, error } = await supabase.auth.resetPasswordForEmail(user?.email, {
        redirectTo: 'http://localhost:3000/reset-password',
      })

      if (error) {  
        notifyError(error.message);
        setIsPassword(false);
        return
      }else{
        notifySuccess('Password reset link sent to your email');
      }
    }else{
      notifyError('Something Went worng. Please try again later');
      setIsPassword(false);
      return
    }
  }


  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Account Settings</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Edit & Update</h4>
          <form action="#">
            <div className="row">
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">First Name</label>
                  <input type="text" placeholder="John Doe" onChange={(e) => setFirstName(e.target.value)} value={first_name} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Last Name</label>
                  <input type="text" placeholder="Kabir" onChange={(e) => setLastName(e.target.value)} value={last_name} />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder="johndoe@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
              </div>
              <div className="col-12 row">
                <div className="dash-input-wrapper mb-20 col-3">
                  <label htmlFor="">Country Code<span className="text-danger">*</span></label>
                  <input type="tel" placeholder="Ex:+91" onChange={(e) => setCountryCode(e.target.value)} value={country_code} />
                </div>
                <div className="dash-input-wrapper mb-20 col-9 position-relative ">
                  <label htmlFor="">Phone Number</label>
                  <input type="tel" placeholder="Ex:00992887" onChange={(e) => setPhone(e.target.value)} value={phone_number} />
                  <div className="position-absolute top-50 end-0 translate-middle-y z-1 ">
                    {otpSent ? <div className="pr-10">
                      <button
                        type="button"
                        className="btn-nine fw-500 tran3s d-block btn-margin mt-10 "
                        onClick={() => resendOtp()}
                        disabled={countdown > 0}
                      >
                        {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                      </button>
                    </div> :
                      <div className="w-100 pr-20">
                        {isLoading ? <><button type="button" className="btn-nine fw-500 tran3s d-block btn-margin mt-10" disabled ><span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span></button></> : <><button type="button" className="btn-nine fw-500 tran3s d-block  btn-margin " onClick={handleSendOTP}>Get OTP</button></>}
                      </div>
                    }
                  </div>
                </div>


              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">OTP <span className="text-danger">*</span></label>
                  <input type="text" placeholder="Enter OTP" onChange={(e) => setUserOtp(e.target.value)} value={userOtp} />
                </div>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center mt-30">
              {isAdding?<button className="dash-btn-two tran3s me-3 rounded-3 coursor-pointer"disabled >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>:<button  className="dash-btn-two tran3s me-3 rounded-3 coursor-pointer" onClick={handlerAdd}>
                Save
              </button>}
            </div>
          </form>
          
              
            
        </div>

        {/* reset password here */}
         <div className="bg-white card-box border-20 mt-30">
          <h2 className="dash-title-three">Reset Password</h2>
          {isPassword?<button disabled className="dash-btn-two tran3s me-3 rounded-3 coursor-pointer "  >
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>:<button onClick={handlePasswordRest} className="dash-btn-two tran3s me-3 rounded-3 coursor-pointer "  >
                Reset Password
            </button>}
              <p className="mt-30">Delete Yout account Here</p>
          <a  href="#"
                className="d-flex w-100 align-items-center text-danger fw-500"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <Image src={nav_8} alt="icon" className="lazy-img" />
                <span>Delete Your Account</span>
              </a>
         </div>
      

       {/* delete yout accout here */}
       <div>
        <DeleteModal/>
       </div>

      </div>
    </div>
  );
};

export default DashboardSettingArea;
