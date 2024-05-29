import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
const UploadResume = ({ resume, setResume }: { resume: string; setResume: any }) => {
    const supabase = createClient();
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [resumeUrl, setResumeUrl] = useState<any>(null);


    useEffect(() => {

        const fecthUrl = async () => {

            const { data, error } = await supabase
                .storage
                .from('resumes')
                .createSignedUrl(resume, 120)
            setResumeUrl(data?.signedUrl)
        }
        fecthUrl();
        
    }, [resume]);
    
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files && event.target.files[0];
                 
        if (file) {
            try {
                setUploading(true);
                const user: any = (await supabase.auth.getUser()).data.user?.id;
                const resumes = await supabase
                    .storage
                    .from('resumes')
                    .list('' + user)
                    if(resumes?.data){
                        const filtered = resumes.data?.filter((item: any) => item.name !== resume.split("/")[1]);
                        if(filtered.length>0){
                          const filteredFileName = filtered.map((item: any) => user + "/" + item.name);

                        const { error } = await supabase.storage.from('resumes').remove(filteredFileName);
                        if(!error){
 
                        }
                        }
                    }

                const { data, error } = await supabase.storage
                    .from("resumes")
                    .upload(user + "/" + Date.now(), file, {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: 'pdf',
                    });
                if (error) {
                    console.error("Error uploading iresume:", error.message);
                } else {
                    console.log("Resume uploaded successfully:");
                    setResume(data.path);
                }
            } catch (error: any) {
                console.error("Error uploading resume:", error.message);
            } finally {
                setUploading(false);
            }
        }
    };
    async function handleDeletePhoto(path: string) {
        try {
            console.log(path);
            const { error } = await supabase.storage.from('resumes').remove([...path]);
            if (error) {
                console.error("Error deleting resume:", error.message);
            } else {
                console.log("resume deleted successfully:");
                setResume(""); // Clear the avatar path in state upon successful deletion
            }
        } catch (error: any) {
            console.error("Error deleting image:", error.message);
        }
    }

    return (
        <div className="bg-white card-box border-20">
            <h4 className="dash-title-three">Resume Attachment</h4>
            <div className="dash-input-wrapper mb-20">
                <label htmlFor="">CV Attachment*</label>
            </div>
            {resume && resumeUrl && (
                <div className="resume-preview">
                    <div className="preview">
                        <Image src={"/assets/images/candidates/blur_resumes.jpg"} alt="avatar" className="lazy-img resume" width={100} height={100} />
                        <div className="view">
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-decoration-none cursor-pointer fs-5"
                            >

                                <i className="bi bi-arrows-fullscreen"></i>
                            </a>
                        </div>
                    </div>
                    <div className="delete">
                        <i
                            className="bi bi-trash3 cursor-pointer color-red "
                            onClick={() => handleDeletePhoto(resume)}
                        ></i>
                    </div>
                </div>
            )}

            <div className="d-flex align-items-center gap-3">

                <div className="dash-btn-one d-inline-block position-relative me-3">

                    {uploading ? `Uploading... ${uploadProgress}%` : resume ? <><i className="bi bi-pencil"></i> Change</> : <><i className="bi bi-plus"></i>Upload New CV</>}
                    <input type="file" id="uploadCV" name="uploadCV" placeholder="" onChange={handleUpload} />
                </div>

            </div>
            <small>Upload file .pdf, .doc, .docx</small>
        </div>
    )
}

export default UploadResume