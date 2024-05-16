"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
import SocialLinkSelect from "./selectSocialLink";
import UploadPhoto from "../uploadPhoto";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createClient } from "@/utils/supabase/client";


// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {

  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
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
        // Generate the map source dynamically based on the address
        const formattedAddress = `${address}, ${city}, ${state}, ${pincode}, ${country}`;
        const encodedAddress = encodeURIComponent(formattedAddress);
        const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
        setMapSrc(mapSrc);
    }, [address, country, city, pincode, state]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
      const { data, error } = await supabase.from('candidate_profile').select('*').eq('id', user.data.user?.id).single();
      if(data && user){
        setAvatar(data.avatar);
        setName(data.name);
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
      else{
        console.log(error);
      }
    }

    fetchUser();
  },[]);

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

  const handleCancle = ()=>{
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
  }
  const handleSave =async (event:any) =>{
    event.preventDefault();
    if( !name || !bio || !address || !country || !city || !pincode || !state){
      notifyError("Please fill all the fields");
      return
    }
    
    try{
      
    if(isData){
      const supabase = createClient();
      console.log(user.id)
        const {data,error} = await supabase.from('candidate_profile').update({avatar, name, bio, address, country, city, pincode, state, social_links: socialLinks}).eq('id',user.id);
        console.log("updata Data ") 
        if(error){
          notifyError("something went worng. Please Retry");
        }else{
          notifySuccess("Profile Updated Successfully");
        }

    }else{


  

       if(user){
       

        const supabase = createClient();
        const {data,error} = await supabase.from('candidate_profile').insert([{id:user?.id,avatar, name, bio, address, country, city, pincode, state, social_links: socialLinks.slice(1,socialLinks.length)}]);
        console.log("create Data ") 
        console.log(data,error);
        if(!error){
          notifySuccess("Profile Created Successfully");  
        }else{
          notifyError("something went worng. Please Retry");
        }
       }
    

    }
      

    }catch(error){
      console.log(error);
      notifyError("something went worng. Please Retry");
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
            <label htmlFor="">Full Name*</label>
            <input
              type="text"
              placeholder="Md James Brower"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
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
              placeholder="#"
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
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
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
                  placeholder="India"
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
                  placeholder="Bengaluru"
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
                  placeholder="57000"
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
                  placeholder="Karnataka"
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
          <a href="#" className="dash-btn-two tran3s me-3" onClick={handleSave}>
            Save
          </a>
          <a href="#" className="dash-cancel-btn tran3s" onClick={handleCancle}>
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileArea;
