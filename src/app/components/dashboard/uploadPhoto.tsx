import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const UploadPhoto = ({ avatar, setAvatar }: { avatar: string; setAvatar: any }) => {
  const supabase = createClient();
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      
      try {
        setUploading(true);
        const user: any = (await supabase.auth.getUser()).data.user?.id;
        
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(user +"/"+Date.now(), file, {
            cacheControl: "3600",
            upsert: false,
            contentType: 'image/jpeg',
          });
        if (error) {
          console.error("Error uploading image:", error.message);
        } else {
          console.log("Image uploaded successfully:", data);
          
          setAvatar(data.path);
        }
      } catch (error: any) {
        console.error("Error uploading image:", error.message);
      } finally {
        setUploading(false);
      }
    }
  };
  async function handleDeletePhoto(imagePath: string) {
    try {
      console.log(imagePath);
      const { error } = await supabase.storage.from('avatars').remove([imagePath]);
      if (error) {
        console.error("Error deleting image:", error.message);
      } else {
        console.log("Image deleted successfully:", imagePath);
        setAvatar(""); // Clear the avatar path in state upon successful deletion
      }
    } catch (error: any) {
      console.error("Error deleting image:", error.message);
    }
  }
  

  return (
    <div className="user-avatar-setting d-flex align-items-center mb-30">
      <Image src={avatar ?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/avatars/${avatar}`:"/assets/images/candidates/01.png"} alt="avatar" className="lazy-img user-img" width={100} height={100}/>
      <div className="upload-btn position-relative tran3s ms-4 me-3">
        {uploading ? `Uploading... ${uploadProgress}%` : "Upload new photo"}
        <input type="file" id="uploadImg" name="uploadImg" placeholder="" onChange={handleUpload} />
      </div>
      <button className="delete-btn tran3s" onClick={()=>handleDeletePhoto(avatar)}>Delete</button>
    </div>
  );
};

export default UploadPhoto;
