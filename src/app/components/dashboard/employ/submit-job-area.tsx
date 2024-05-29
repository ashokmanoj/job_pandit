"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployExperience from "./employ-experience";
import Employer_JD_File_Upload from "../upload_JD_File";
import AddLanguage from "./AddLanguage";
import AddSkills from "./Add_Skills";
import Job_Type from "./job_Type";
import Salary from "./salary";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createClient } from "@/utils/supabase/client";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const [salary, setSalary] = React.useState({
    label: "",
    value: "",
  });
  const [jobType, setJobType] = React.useState({
    label: "",
    value: "",
  });
  const [expertise, setExpertise] = React.useState({
    label: "",
    value: "",
  });
  const [experience, setExperience] = React.useState({
    label: "",
    value: "",
  });
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState({ label: "", value: "" });
  const [skills, setSkills] = React.useState<string[]>([]);
  const [language, setLanguage] = React.useState<string[]>([]);
  const [fileName, setFileName] = React.useState<string>("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [mapSrc, setMapSrc] = useState("");
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

  const handleCancle = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setMin("");
    setMax("");
    setLocation("");
    setSkills([]);
    setLanguage([]);
    setFileName("");
    setAddress("");
    setCountry("");
    setCity("");
    setPinCode("");
    setState("");
    setExperience({ label: "", value: "" });
    setJobType({ label: "", value: "" });
    setExpertise({ label: "", value: "" });
    setSalary({ label: "", value: "" });
    setEducation({ label: "", value: "" });
    setIsData(true);
  };

  const handleSave = async (event: any) => {
    event.preventDefault();
    if (!title) {
      notifyError("Please Enter Title");
      return;
    }else if (!category) {
      notifyError("Please Enter Category");
      return;
    } else if (!description) {
      notifyError("Please Enter Description");
      return;
    } else if (!min) {
      notifyError("Please Enter Min");
      return;
    } else if (!max) {
      notifyError("Please Enter Max");
      return;
    } else if (!location) {
      notifyError("Please Enter Location");
      return;
    } else if (!education) {
      notifyError("Please Enter Education");
      return;
    } else if (!skills) {
      notifyError("Please Enter Skills");
      return;
    } else if (!language) {
      notifyError("Please Enter Language");
      return;
    } else if (!fileName) {
      notifyError("Please Upload JD File");
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
    } else if (!experience) {
      notifyError("Please Enter Experience");
      return;
    } else if (!jobType) {
      notifyError("Please Enter Job Type");
      return;
    } else if (!expertise) {
      notifyError("Please Enter Expertise");
      return;
    } else if (!salary) {
      notifyError("Please Enter Salary");
      return;
    }
    try {
      if (isData) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("job_post")
          .update({
            title,
            category,
            description,
            min,
            max,
            location,
            education : education.value,
            skills,
            language,
            fileName,
            address,
            country,
            city,
            pincode,
            state,
            experience : experience.value,
            job_type: jobType.value,
            expertise : expertise.value,
            salary : salary.value,
            
          })
          .eq("user_id", user.id)
          .single();
        if (error) {
          notifyError("something went worng. Please Retry");
        } else {
          notifySuccess("Profile Updated Successfully");
        }
      } else {
        const supabase = createClient();
        const { data, error } = await supabase.from("job_post").insert([
          {
            id: user.id,
            title,
            category,
            description,
            min,
            max,
            location,
            education,
            skills,
            language,
            fileName,
            address,
            country,
            city,
            pincode,
            state,
            experience,
            job_type: jobType.value,
            expertise,
            salary,
          },
        ]);
        console.log("data created");
        console.log(data, error);
        if (!error) {
          notifySuccess("Profile Updated Successfully");
        } else {
          notifyError("something went worng. Please Retry");
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("something went worng. Please Retry");
    }
  };

  useEffect(() => {
  

    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("job_post")
        .select("*")
        .eq("id", user.data.user?.id)
        .single();
      if (data && user) {
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
        setMin(data.min);
        setMax(data.max);
        setLocation(data.location);
        setSkills(data.skills);
        setLanguage(data.language);
        setFileName(data.fileName);
        setAddress(data.address);
        setCountry(data.country);
        setCity(data.city);
        setPinCode(data.pincode);
        setState(data.state);
        setExperience({ label: data.experience, value: data.experience });
        setJobType({ label: data.job_type, value: data.job_type });
        setExpertise({ label: data.expertise, value: data.expertise });
        setSalary({ label: data.salary, value: data.salary });
        setEducation({ label: data.education, value: data.education });
        setIsData(true);
      } else {
        console.log(error);
      }
    };
  });
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Post a New Job</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Title*</label>
            <input
              type="text"
              placeholder="Ex: Product Designer"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Description*</label>
            <textarea
              className="size-lg"
              placeholder="Write about the job in details..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Category</label>
                <input
                  type="text"
                  placeholder="Ex: Product Designer"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </div>
            </div>
            <div className="col-md-6">
              <Job_Type jobType={jobType} setJobType={setJobType} />
            </div>
            <div className="col-md-6">+
              <Salary salary={salary} setSalary={setSalary} />
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input
                  type="text"
                  placeholder="Min"
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input
                  type="text"
                  placeholder="Max"
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
            </div>
          </div>

          <AddSkills skills={skills} setSkills={setSkills} />

          {/* employ experience start */}
          <EmployExperience
            experience={experience}
            setExperience={setExperience}
            Expertise={expertise}
            setExpertise={setExpertise}
            education={education}
            setEducation={setEducation}
          />
          {/* employ experience end */}
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Languages*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <AddLanguage language={language} setLanguage={setLanguage} />
              </div>
            </div>
          </div>
          <Employer_JD_File_Upload
            fileName={fileName}
            setFileName={setFileName}
          />

          <h4 className="dash-title-three pt-50 lg-pt-30">
            Address & Location
          </h4>
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
          <a
            href="#"
            className="dash-cancel-btn tran3s"
            onClick={() => handleCancle()}
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
