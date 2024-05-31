"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
import SocialLinkSelect from "./selectSocialLink";
import UploadPhoto from "../uploadPhoto";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createClient } from "@/utils/supabase/client";
import NiceSelect from "@/ui/nice-select";


// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {

  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contactEmail, setcontactEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [qualification, setQualification] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState([{ label: "", value: "" }]);
  const [singleLink, setSingleLink] = useState<any>({ label: "", value: "" });
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [mapSrc, setMapSrc] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isData, setIsData] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
      const { data, error } = await supabase.from('candidate_profile').select('*').eq('id', user.data.user?.id).single();
      if (data && user) {
        setAvatar(data.avatar);
        setName(data.name);
        setcontactEmail(data.contact_email);
        setQualification(data.qualification);
        setExperience(data.experience);
        setGender(data.gender);
        setDob(data.dob);
        setBio(data.bio);
        setSocialLinks(data.social_links);
        setSingleLink({ label: "", value: "" });
        setAddress(data.address);
        setCountry(data.country);
        setCity(data.city);
        setPinCode(data.pincode);
        setState(data.state);
        setIsData(true);


      }
      else {
        console.log(error);
      }
    }

    fetchUser();
  }, []);
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
    setAvatar('');
    setBio('');
    setName('');
    setSocialLinks([{ label: "", value: "" }]);
    setSingleLink({ label: "", value: "" });
    setAddress('');
    setCountry('');
    setCity('');
    setPinCode('');
    setState('');
    setcontactEmail('');
    setGender('');
    setDob('');
    setIsData(false);
    setQualification('');
    setExperience('');


  }
  const handleSave = async (event: any) => {
    event.preventDefault();
    if (!name) {
      notifyError("Please Enter Name");
      return;
    } else if (!address) {
      notifyError("Please Enter Address");
      return;
    } else if (!country) {
      notifyError("Please Enter Country");
      return;
    } else if (!city) {
      notifyError("Please Enter City");
      return;
    } else if (!pincode) {
      notifyError("Please Enter Pincode");
      return;
    } else if (!state) {
      notifyError("Please Enter State");
      return;
    } else if (!bio) {
      notifyError("Please Enter Bio");
      return;
    } else if (!avatar) {
      notifyError("Please Upload Avatar");
      return;
    } else if (!socialLinks) {
      notifyError("Please Enter Social Links");
      return;
    } else {

      try {

        if (isData) {
          const supabase = createClient();
          console.log(user.id)
          const { data, error } = await supabase.from('candidate_profile').update({ avatar, name,contact_email: contactEmail,qualification,experience, gender, dob, bio, address, country, city, pincode, state, social_links: socialLinks, mapSrc }).eq('id', user.id).select('*').single();
          console.log("updata Data ")
          if (error) {
            notifyError("something went worng. Please Retry");
            console.log(error,"error in update");
          } else {
            notifySuccess("Profile Updated Successfully");
            setAvatar(data.avatar);
            setName(data.name);
            setcontactEmail(data.contact_email);
            setQualification(data.qualification);
            setExperience(data.experience);
            setGender(data.gender);
            setDob(data.dob);
            setBio(data.bio);
            setSocialLinks(data.social_links);
            setSingleLink({ label: "", value: "" });
            setAddress(data.address);
            setCountry(data.country);
            setCity(data.city);
            setPinCode(data.pincode);
            setState(data.state);
            setIsData(true);
          }

        } else {
          if (user) {
            const supabase = createClient();
            console.log(user?.id, avatar, name, contactEmail, qualification, experience, gender, dob, bio, address, country, city, pincode, state, socialLinks, mapSrc);
            const { data, error } = await supabase.from('candidate_profile').insert([{ id: user?.id, avatar, name, contact_email: contactEmail,qualification,experience, gender, dob, bio, address, country, city, pincode, state, social_links: socialLinks.slice(1, socialLinks.length), mapSrc }]).select('*').single();
            console.log("error insert Data ", error,data)
            if (!error) {
              notifySuccess("Profile Created Successfully");
              setAvatar(data.avatar);
              setName(data.name);
              setcontactEmail(data.contact_email);
              setGender(data.gender);
              setDob(data.dob);
              setQualification(data.qualification);
              setExperience(data.experience);
              setBio(data.bio);
              setSocialLinks(data.social_links);
              setSingleLink({ label: "", value: "" });
              setAddress(data.address);
              setCountry(data.country);
              setCity(data.city);
              setPinCode(data.pincode);
              setState(data.state);

              setIsData(true);
            } else {
              notifyError("something went worng. Please Retry");
            }
          }


        }


      } catch (error) {
        console.log(error);
        notifyError("something went worng. Please Retry");
      }


    }
  }



  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">My Profile</h2>

        <div className="bg-white card-box border-20">
          <UploadPhoto avatar={avatar} setAvatar={setAvatar} />
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Full Name<span className="text-danger">*</span></label>
            <input
              type="text"
              placeholder="Ex : Madhu Kiran"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="dash-input-wrapper mb-30 ">
            <label htmlFor="">Contact Email <span className="text-danger">*</span></label>
            <input
              type="email"
              placeholder="Ex : madhu@email.com"
              onChange={(e) => setcontactEmail(e.target.value)}
              value={contactEmail}
            />
          </div>
          <div className="row">
          <div className="dash-input-wrapper mb-30 col-6">
            <label htmlFor="">Qualification<span className="text-danger">*</span></label>
            <NiceSelect
              options={[
                { value: "10th", label: "10th" },
                { value: "12th", label: "12th" },
                {value:"Diploma(Computer Science)",label:"Diploma(Computer Science)"},
                {value:"Diploma(Other)",label:"Diploma(Other)"},
                {value:"BA",label:"BA"},
                {value:"BCom",label:"BCom"},
                {value:"BSc",label:"BSc(Computer Science)"},
                {value:"BSc",label:"BSc(Other)"},
                {value:"BCA",label:"BCA"},
                {value:"B.Tech",label:"B.Tech"},
                {value:"BE",label:"BE"},
                {value:"MBA",label:"MBA"},
                {value:"MCom",label:"MCom"},
                {value:"MCA",label:"MCA"},
                {value:"MSc",label:"MSc"},
                {value:"M.Tech",label:"M.Tech"},
                {value:"Other",label:"Other"},
              ]}
              defaultCurrent={0}
              onChange={(item) => setQualification(item.value)}
              name="experience"
              cls="category"
              value={qualification}
            />
          </div>
          <div className="dash-input-wrapper mb-30 col-6">
            <label htmlFor="">Experience  <span className="text-danger">*</span></label>
            <NiceSelect
              options={[
                { value: "fresher", label: "Fresher" },
                { value: "1 year", label: "1 year" },
                { value: "2 year", label: "2 year" },
                { value: "3 year", label: "3 year" },
                { value: "4 year", label: "4 year" },
                { value: "5 year", label: "5 year" },
                { value: "6 year", label: "6 year" },
                { value: "7 year", label: "7 year" },
                { value: "8 year", label: "8 year" },
                { value: "9 year", label: "9 year" },
                { value: "10+ year", label: "10+ year" },
           
              ]}
              defaultCurrent={0}
              onChange={(item) => setExperience(item.value)}
              name="experience"
              cls="category"
              value={experience}
            />
          </div>
          </div>
          <div className="row">
            
          <div className="dash-input-wrapper mb-30 col-6">
            <label htmlFor="">Gender <span className="text-danger">*</span></label>

            <NiceSelect
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },

              ]}
              defaultCurrent={0}
              onChange={(item) => setGender(item.value)}
              name="gender"
              cls="category"
              value={gender}
            />
          </div>
          <div className="dash-input-wrapper mb-30 col-6">
            <label htmlFor="">Date of Birth*</label>
            <input
              type="date"
              placeholder="Date of Birth"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            />
          </div>
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">Bio*</label>
            <textarea
              className="size-lg"
              placeholder="Write something interesting about you...."
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            ></textarea>
            <div className="alert-text">
              Brief description for your profile. URLs are hyperlinked.
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>
          {socialLinks?.map((link: any, index: number) => {
            if (index >= 0) {
              return (
                <div
                  className="dash-input-wrapper mb-20 d-flex gap-2"
                  key={index}
                >
                  <div className="w-25 text-capitalize fw-500 mb-0 border-1 border  border-secondary  p-2 text-center rounded bg-greeen col-3   ">
                    {link?.label}
                  </div>
                  <div className="w-75  fw-500 mb-0 border-1 border border-secondary  p-2 text-center rounded  text-truncate lg-col-3 sm-col-6">
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
            <div className="col-3">
              <SocialLinkSelect
                setSingleLink={setSingleLink}
                singleLink={singleLink}
              />
            </div>
            <input
              type="text"
              placeholder="Ex : https://twitter.com"
              onChange={(e) =>
                setSingleLink({ ...singleLink, value: e.target.value })
              }
              value={singleLink.value}
            />
          </div>
          {/* <div className="dash-input-wrapper d-flex gap-2 mb-20">
            <label htmlFor="">Network 2</label>
            <input type="text" placeholder="#" />
            <SocialLinkSelect/>
          </div> */}
          <button onClick={handleAddLink} className="dash-btn-one">
            <i className="bi bi-plus"></i> Add more link
          </button>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Address & Location</h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input
                  type="text"
                  placeholder="Ex : Saraswathipuram, Mysore, Karnataka"
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
                  placeholder="Ex : 573201"
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

        <div className="button-group d-inline-flex align-items-center mt-30">
          {uploading ? (
            <button className="dash-btn-two tran3s me-3" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button className="dash-btn-two tran3s me-3" onClick={handleSave}>
              Save
            </button>
          )}
          <a href="#" className="dash-cancel-btn tran3s" onClick={handleCancle}>
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileArea;
