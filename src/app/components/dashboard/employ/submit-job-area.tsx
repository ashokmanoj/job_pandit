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
import Education from "./Education";
import NiceSelect from "@/ui/nice-select";
import { useUserStore } from "@/lib/store/user";
import Category from "./category";
import { usePathname } from "next/navigation";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  params: any;
};

const SubmitJobArea = ({ setIsOpenSidebar ,params}: IProps) => {
  const [salaryType, setSalaryType] = useState<any>('');
  const [jobType, setJobType] = useState<any>('');
  const [experience, setExperience] = useState<any>('');
  const [category, setCategory] = useState<any>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [education, setEducation] = useState<any>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [language, setLanguage] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isData, setIsData] = useState<boolean>(false);
  const [vacancy, setVacancy] = useState<number>(0);
  const [workmode, setWorkMode] = useState<string>('');
  const [candidate, setCandidate] = useState<string>('');
  const [jobPostId, setJobPostId] = useState<number>(Number(params?.jobpostId));
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const pathName = usePathname();
  console.log(pathName, "pathName");
  const supabase = createClient();
  const { user } = useUserStore();

 
  const handleCancle = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setMin(0);
    setMax(0);
    setLocation("");
    setSkills([]);
    setLanguage([]);
    setFileName("");
    setExperience({ label: "", value: "" });
    setJobType({ label: "", value: "" });
    setSalaryType({ label: "", value: "" });
    setEducation({ label: "", value: "" });
    setWorkMode('');
    setCandidate('');
    setIsData(true);
  };

  async function handleSave() {
    if (!title) {
      notifyError("Please Enter Title");
      return;
    } else if (!category) {
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
    
    } else if (!experience) {
      notifyError("Please Enter Experience");
      return;
    } else if (!jobType) {
      notifyError("Please Enter Job Type");
      return;
    } else if (!salaryType) {
      notifyError("Please Enter SalaryType");
      return;
    } else if (!candidate) {
      return notifyError("Please Enter Candidate");
    } else if (!workmode) {
      return notifyError("Please Enter Work Mode");
    } else if (!vacancy){
      return notifyError("Please Enter Vacancy");
    }
    else {
      setIsUploading(true);
      if (isData) {
        const { data, error } = await supabase
          .from("job_posts")
          .update({
            title, category, description, min_salary: min, max_salary: max, location, education: education, skills, language, file_name: fileName,
            experience,
            job_type: jobType,
            salary_type: salaryType,
            workmode,
            candidate,
            vacancy
          })
          .eq("id", jobPostId)
          .select('*').single();
        if (error) {
          console.error("Error updating data:", error.message);
          notifyError("Error updating data");
          setIsData(false);
        } else {
          notifySuccess("Profile Updated Successfully");  

        }
      } else {
        const { data, error } = await supabase.from("job_posts").insert([
          {
            user_id: user?.id, title, category, description, min_salary: min, max_salary: max, location, education: education, skills, language, file_name: fileName,
            experience,
            job_type: jobType,
            salary_type: salaryType,
            workmode,
            candidate,
            vacancy
          }
        ])
          .select("*")
          .single();
        console.log("data created");
        console.log(data, error);
        if (!error) {
          notifySuccess("Profile Created Successfully");
        } else {
          notifyError("something went worng. Please Retry");
        }
      }
    }
    setIsUploading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("job_posts")
        .select("*")
        .eq("id", jobPostId).eq("user_id", user?.id)
        .single();
      console.log(data, error, "fetching submit ")
      if (data) {
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
        setMin(data.min_salary);
        setMax(data.max_salary);
        setLocation(data.location);
        setSkills(data.skills);
        setLanguage(data.language);
        setFileName(data.file_name);
        setExperience(data.experience);
        setJobType(data.job_type);
        setSalaryType(data.salary);
        setEducation(data.education);
        setWorkMode(data.workmode);
        setCandidate(data.candidate);
        setVacancy(data.vacancy);
        setIsData(true);
        setJobPostId(data.id);
      } else {
        console.log(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);


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
            <label htmlFor="">Job Title <span className="text-danger">*</span></label>
            <input
              type="text"
              placeholder="Ex: Product Designer"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Description <span className="text-danger">*</span></label>
            <textarea
              className="size-lg"
              placeholder="Write about the job in details..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="row align-items-end">
            <div className="col-md-6">
              <Category category={category} setCategory={setCategory} />
            </div>
            <div className="col-md-6">
              <Job_Type jobType={jobType} setJobType={setJobType} />
            </div>
            <div className="col-md-6">+
              <Salary salary={salaryType} setSalary={setSalaryType} />
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
              <label htmlFor="">Max-Salary*</label> 
                <input
                  type="number"
                  placeholder="Ex : 2,50,000"
                  onChange={(e) => setMin(Number(e.target.value))}
                  value={min}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
              <label htmlFor="">Max-Salary*</label> 
                <input
                  type="number"
                  placeholder="Ex : 3,50,000"
                  onChange={(e) => setMax(Number(e.target.value))}
                  value={max}
                />
              </div>
            </div>
          </div>

          <AddSkills skills={skills} setSkills={setSkills} />

          {/* employ experience start */}


          <div className="row align-items-end">
            <EmployExperience
              experience={experience}
              setExperience={setExperience} />

            <Education education={education} setEducation={setEducation} />

            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Workmode <span className="text-danger">*</span></label>
                <NiceSelect
                  options={[
                    { value: "Hybride", label: "Hybride" },
                    { value: "Remote", label: "Remote" },
                    { value: "Office", label: "Office" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => setWorkMode(item.value)}
                  name="WorkMode"
                  cls="category"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Candidate*</label>
                <NiceSelect
                  options={[
                    { value: "Both the Candidates", label: "Both the Candidates" },
                    { value: "Only Male Candidates", label: "Male Candidates" },
                    { value: "Only Female Candidates", label: "Female Candidates" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => setCandidate(item.value)}
                  name="Candidate"
                  cls="category"
                />
              </div>
            </div>
            <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="">Vacancy<span className="text-danger">*</span></label> 
                <input
                  type="number"
                  placeholder="Ex : 100 Vacances"
                  onChange={(e) => setVacancy(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Location <span className="text-danger">*</span></label>
                <input
                  type="text"
                  placeholder="Ex: Hassan"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
          </div>


          {/* employ experience end */}
          <div className="row">
            <div className="col-lg-20">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Languages*</label>
                <AddLanguage language={language} setLanguage={setLanguage} />
              </div>
            </div>
          </div>
          <Employer_JD_File_Upload
            filename={fileName}
            setFileName={setFileName}
          />

        </div>

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
            
            <a href="#" className="dash-btn-two tran3s me-3" onClick={handleSave}>
            Save
          </a>
          )}
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
