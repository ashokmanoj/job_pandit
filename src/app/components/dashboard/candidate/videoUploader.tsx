import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import video_bg from '@/assets/dashboard/images/video_post.jpg';
import VideoPopup from '../../common/video-popup';
import { notifyError } from '@/utils/toast';

const VideoUploader = ({ video, setVideo }: { video: string, setVideo: any }) => {
  const [videoUrl, setVideoUrl] = useState<any>('');
    const supabase = createClient();
    const [uploading, setUploading] = useState<boolean>(false);
    useEffect(() => {
        
      const fecthUrl = async () => {
          
          const { data, error } = await supabase
              .storage
              .from('resume_videos')
              .createSignedUrl(video, 120)
          console.log(data);
        if(data){
          setVideoUrl(data?.signedUrl)
        }else{

        }
      }

      fecthUrl();
  }, [video]);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if(video!==""){
          notifyError("Please delete previous video before uploading new one");
          return
        }
        if (file ) {
          
          try {
            setUploading(true);
            const user: any = (await supabase.auth.getUser()).data.user?.id;
            
            const { data, error } = await supabase.storage
              .from("resume_videos")
              .upload(user +"/"+Date.now(), file, {
                cacheControl: "3600",
                upsert: false,
                contentType: 'video/*',
              });
            if (error) {
              console.error("Error uploading Video:", error.message);
            } else {
              console.log("Video uploaded successfully:", data);
              
              setVideo(data.path);
            }
          } catch (error: any) {
            console.error("Error uploading Video:", error.message);
          } finally {
            setUploading(false);
          }
        }
      };
      async function handleDeleteVideo(imagePath: string) {
        try {
          console.log(imagePath);
          const { error } = await supabase.storage.from('resume_videos').remove([imagePath]);
          if (error) {
            console.error("Error deleting video:", error.message);
          } else {
            console.log("Video deleted successfully:", imagePath);
            setVideo(""); // Clear the avatar path in state upon successful deletion
          }
        } catch (error: any) {
          console.error("Error deleting video:", error.message);
        }
      }
  return (
    <>
    <div className="row">
    {videoUrl ?  <div className="col-sm-6 d-flex">
              <div className="intro-video-post position-relative mt-20" >
             <video src={videoUrl} controls className='w-100 aspect-square'></video>
                

                <button onClick={() => handleDeleteVideo(video)} className="close"><i className="bi bi-x"></i></button>
              </div>
            </div>:
            <div className="col-sm-6 d-flex">
              <div className="intro-video-post position-relative empty mt-20">
                {uploading ? 
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                : 
                <><span>+ Add Intro Video</span>  
                <input type="file" id="uploadVdo" name="uploadVdo" placeholder="" onChange={handleUpload}  /></>
                      }
              </div>
            </div>}
          </div>
         
</>

  )
}

export default VideoUploader