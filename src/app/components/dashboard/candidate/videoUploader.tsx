import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
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
        setVideoUrl(data?.signedUrl)
    }
    fecthUrl();
}, [video]);

const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file ) {
          try {
            setUploading(true);
            const user: any = (await supabase.auth.getUser()).data.user?.id;
            const videos = await supabase
            .storage
            .from('resume_videos')
            .list('' + user)
            if(videos?.data){
                const filtered = videos.data?.filter((item: any) => item.name !== video?.split("/")[1]);
                if(filtered.length>0){
                  const filteredFileName = filtered.map((item: any) => user + "/" + item.name);

                await supabase.storage.from('resume_videos').remove(filteredFileName);
                }
            }
            const { data, error } = await supabase.storage
              .from("resume_videos")
              .upload(user +"/"+Date.now(), file, {
                cacheControl: "3600",
                upsert: false,
                contentType: 'video/*',
              });
            if (error) {
              notifyError("Please Upload Video in MP4 Format");
            } else { 
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
          if(!error){
            setVideo(null); // Clear the avatar path in state upon successful deletion
            setVideoUrl('');
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
            <span>Upload your self-introduction video here</span>
          </div>
</>

  )
}

export default VideoUploader