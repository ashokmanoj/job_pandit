import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { notifyError, notifySuccess } from "@/utils/toast";
const Employer_JD_File_Upload = ({ fileName, setFileName }: { fileName: string; setFileName: any; }) => {
    const supabase = createClient();
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [resumeUrl, setResumeUrl] = useState<any>(null);
    

    useEffect(() => {
        
        const fecthUrl = async () => {
            
            const { data, error } = await supabase
                .storage
                .from('employer_JD_files')
                .createSignedUrl(fileName, 120)
            console.log(data);
          setResumeUrl(data?.signedUrl)
        }

        fecthUrl();
    }, [fileName]);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files && event.target.files[0];
        if (file) {

            try {
                setUploading(true);
                const user: any = (await supabase.auth.getUser()).data.user?.id;

                const { data, error } = await supabase.storage
                    .from("employer_JD_files")
                    .upload(user + "/" + Date.now(), file, {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: 'pdf',
                    });
                if (error) {
                    console.error("Error uploading file:", error.message);
                } else {
                    console.log("File uploaded successfully:", data);

                    setFileName(data.path);
                }
            } catch (error: any) {
                console.error("Error uploading file:", error.message);
            } finally {
                setUploading(false);
            }
        }
    };
    async function handleDeletePhoto(path: string) {
        try {
            console.log(path);
            const { error } = await supabase.storage.from('employer_JD_files').remove([path]);
            if (error) {
                console.error("Error deleting file:", error.message);
            } else {
                console.log("file deleted successfully:", path);
                setFileName(""); // Clear the avatar path in state upon successful deletion
            }
        } catch (error: any) {
            console.error("Error deleting file:", error.message);
        }
    }

    return (
        
        <div className="bg-white border-20 mt-40">
            <h4 className="dash-title-three">File Attachment</h4>
            <div className="dash-input-wrapper mb-20">
                <label htmlFor="">File Attachment*</label>
            </div>
            {fileName && resumeUrl && (
                    <div className="resume-preview">
                      <div className="preview">
                      <Image src={"/assets/images/candidates/blur_resumes.jpeg"} alt="avatar" className="lazy-img resume" width={100} height={100}/>
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
                                onClick={() => handleDeletePhoto(fileName)}
                            ></i>
                        </div>
                    </div>
                )}
            
            <div className="d-flex align-items-center gap-3">
                
            <div className="dash-btn-one d-inline-block position-relative me-3">
               
                {uploading ? `uploading... ${uploadProgress}%` : fileName ?<><i className="bi bi-pencil"></i> Change</> : <><i className="bi bi-plus"></i>Upload New File</>}
                <input type="file" id="employer_JD_file_upload" name="employer_JD_file_upload" placeholder="" onChange={handleUpload} />
            </div>
                
            </div>
            <small>Upload file .pdf, .doc, .docx</small>
        </div>
    )
}

export default Employer_JD_File_Upload