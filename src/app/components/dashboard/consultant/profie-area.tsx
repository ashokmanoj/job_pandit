"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployUploadPhoto from "../employUploadPhoto";
import SocialLinkSelect from "../candidate/selectSocialLink";
import { createClient } from "@/utils/supabase/client";
import { notifyError, notifySuccess } from "@/utils/toast";
import Company_Type from "../employ/Company_Type";
import Category from "../employ/category"
import AddCompanies from "./AddCompanies";
import Link from "next/link";



// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type memberType = {
  name: string;
  designation: string;
  email: string;
};

const EmployProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const [avatar, setAvatar] = useState<string>("");
  const [companyname, setCompanyname] = useState<string>("");
  const [companyType, setCompanyType] = useState<any>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [csize, setCsize] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [companies, setCompanies] = useState<memberType[]>([]);
  const [socialLinks, setSocialLinks] = useState([{ label: "", value: "" }]);
  const [singleLink, setSingleLink] = useState<any>({ label: "", value: "" });
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [mapSrc, setMapSrc] = useState("");
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [isData, setIsData] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  

  useEffect(() => {
    // Generate the map source dynamically based on the address
    const formattedAddress = `${address}, ${city}, ${state}, ${pincode}, ${country}`;
    const encodedAddress = encodeURIComponent(formattedAddress);
    const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
    setMapSrc(mapSrc);
  }, [address, country, city, pincode, state]);

  function handleAddLink(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (singleLink.label !== "" && singleLink.value !== "") {
      setSocialLinks([...socialLinks, singleLink]);
      setSingleLink({ label: "", value: "" });
    }
  }
  function handleDeleteLink(
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ): void {
    event.preventDefault();
    setSocialLinks([
      ...socialLinks.slice(0, index),
      ...socialLinks.slice(index + 1),
    ]);
  }

  const handleCancle = () => {
    setAvatar("");
    setEmail("");
    setCompanyType("");
    setWebsite("");
    setDate("");
    setCsize("");
    setPhone("");
    setCategory("");
    setAbout("");
    setCompanyname("");
    setSocialLinks([{ label: "", value: "" }]);
    setSingleLink({ label: "", value: "" });
    setAddress("");
    setCountry("");
    setCity("");
    setPinCode("");
    setState("");
  };


  const handleSave = async (event: any) => {
    event.preventDefault();
    if (!avatar) {
      return notifyError("Please select an avatar");
    } else if (!companyname) {
      return notifyError("Please enter company name")
    } else if (!email) {
      return notifyError("Please enter email")
    } else if (!website) {
      return notifyError("Please enter website")
    } else if (!date) {
      return notifyError("Please enter date")
    } else if (!csize) {
      return notifyError("Please enter company size")
    } else if (!phone) {
      return notifyError("Please enter phone")
    } else if (!category) {
      return notifyError("Please enter category")
    } else if (!about) {
      return notifyError("Please enter about")
    } else if (!address) {
      return notifyError("Please enter address")
    } else if (!country) {
      return notifyError("Please enter country")
    }

    try {
      if (isData) {
        console.log(user?.id);
        const { data, error } = await supabase
          .from("employer_profile")
          .update({
            avatar,
            company_name: companyname,
            company_Type: companyType,
            email,
            website,
            date: date,
            company_size: csize,
            phone_no: phone,
            category,
            about,
            social_links: socialLinks,
            address,
            country,
            city,
            pincode,
            state,
            vender_companies: companies,
            isConsultant: true
          })
          .eq("id", user?.id);
        console.log("upadate Data ");
        if (error) {
          console.log(error);
        } else {
          notifySuccess("Profile Updated Successfully");
          setIsData(!isData);
        }
      } else {
        if (user) {
          const { data, error } = await supabase
            .from("employer_profile")
            .insert([
              {
                id: user?.id,
                avatar,
                company_name: companyname,
                company_Type: companyType,
                email,
                website,
                date: date,
                company_size: csize,
                phone_no: phone,
                category,
                about,
                social_links: socialLinks.slice(1, socialLinks.length),
                address,
                country,
                city,
                pincode,
                state,
                vender_companies: companies,
                isConsultant: true
              },
            ]);
          console.log(" create Data ");
          console.log(data, error);
          if (!error) {
            notifySuccess("Profile Created Successfully");
            setIsData(!isData);
          } else {
            notifyError("something went worng. Please Retry");

          }
        }
      }
    } catch (error) {
      console.log(error);
      console.log("something went worng. Please Retry");
    }
  };

  const fetchUser = async () => {
    const user = await supabase.auth.getUser();
    setUser(user.data.user);
    const { data, error } = await supabase
      .from("employer_profile")
      .select("*")
      .eq("id", user.data.user?.id)
      .single();
    if (data && user) {
      setAvatar(data.avatar);
      setCompanyname(data.company_name);
      setCompanyType(data.company_Type)
      setEmail(data.email);
      setWebsite(data.website);
      setDate(data.date);
      setCsize(data.company_size);
      setPhone(data.phone_no);
      setCategory(data.category);
      setAbout(data.about);
      setSocialLinks(data.social_links);
      setSingleLink({ label: "", value: "" });
      setAddress(data.address);
      setCountry(data.country);
      setCity(data.city);
      setPinCode(data.pincode);
      setState(data.state);
      setCompanies(data.vender_companies);
      setIsData(true);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [user,isData]);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Profile</h2>
        {isData &&<div >
          <Link href={`/company/${user?.id}`} className="btn-two mb-30">
          View Profile</Link>
        </div>}
        <div className="bg-white card-box border-20">
          <div className="row position-relative">
            <EmployUploadPhoto avatar={avatar} setAvatar={setAvatar} />
        
            
            
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Company Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  placeholder="Ex : Amazon"
                  onChange={(e) => setCompanyname(e.target.value)}
                  value={companyname}
                />

              </div>
            </div>
            <div className="col-md-6">
              <Company_Type companyType={companyType} setCompanyType={setCompanyType}/>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Email <span className="text-danger">*</span></label>
                <input
                  type="email"
                  placeholder="Ex : company@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Website*</label>
                <input
                  type="text"
                  placeholder="Ex : http://google.com"
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Founded Date*</label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Company Size <span className="text-danger">*</span></label>
                <input
                  type="text"
                  placeholder="Ex : 50 Members"
                  onChange={(e) => setCsize(e.target.value)}
                  value={csize}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Phone Number <span className="text-danger">*</span></label>
                <input
                  type="tel"
                  placeholder="Ex : +91 91723801729"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>
            <div className="col-md-6">
            <Category category={category} setCategory={setCategory} />
            </div>
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">About Company*</label>
            <textarea
              className="size-lg"
              placeholder="Write something interesting about you...."
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            ></textarea>
            <div className="alert-text">
              Brief description for your company. URLs are hyperlinked.
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>
          {socialLinks?.map((link: any, index: number) => {
            if (index > 0) {
              return (
                <div
                  className="dash-input-wrapper mb-20 d-flex gap-2"
                  key={index}
                >
                  <div className="w-25 text-capitalize fw-500 mb-0 border-1 border  border-secondary  p-2 text-center rounded bg-greeen  ">
                    {link?.label}
                  </div>
                  <div className="w-75  fw-500 mb-0 border-1 border border-secondary  p-2 text-center rounded  text-truncate">
                    {link?.value}
                  </div>
                  <button
                    onClick={(e) => handleDeleteLink(e, index)}
                    className="dash-btn-one"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              );
            }
          })}
          <div className="dash-input-wrapper mb-20 d-flex gap-2">
            <SocialLinkSelect
              setSingleLink={setSingleLink}
              singleLink={singleLink}
            />
            <input
              type="text"
              placeholder="Ex : https://instagram.com"
              onChange={(e) =>
                setSingleLink({ ...singleLink, value: e.target.value })
              }
              value={singleLink.value}
            />
          </div>
          <button onClick={handleAddLink} className="dash-btn-one">
            <i className="bi bi-plus"></i> Add more link
          </button>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Address & Location</h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address <span className="text-danger">*</span></label>
                <input
                  type="text"
                  placeholder="Ex : Cowrasta, Chandana, Gazipur Sadar"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <input
                  type="text"
                  placeholder="Ex : India"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                />
                {/* <CountrySelect/> */}
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label>
                <input
                  type="text"
                  placeholder="Ex : Mysore"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
                {/* <CitySelect/> */}
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Pin Code*</label>
                <input
                  type="number"
                  placeholder="573201"
                  onChange={(e) => setPinCode(e.target.value)}
                  value={pincode}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <input
                  type="text"
                  placeholder="Ex : Karnataka"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
                {/* <StateSelect/> */}
              </div>
            </div>
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Map Location*</label>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src={mapSrc}
                    ></iframe>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AddCompanies company={companies} setCompany={setCompanies} />

        <div className="button-group d-inline-flex align-items-center mt-30">
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
            
            <button className="dash-btn-two tran3s me-3" onClick={handleSave}>
                Save
              </button>
          )}
          <button className="dash-cancel-btn tran3s" onClick={handleCancle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployProfileArea;
