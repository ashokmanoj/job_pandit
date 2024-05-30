'use client'
import { createClient } from '@/utils/supabase/client';
import React,{useEffect, useState} from 'react'

const VideoPlayer = ({video}: {video: string}) => {
    const supabase = createClient();
  const [videoUrl, setVideoUrl] = useState<string>('');

    useEffect(() => {
        
        const fecthUrl = async () => {
  
          const { data, error } = await supabase
              .storage
              .from('resume_videos')
              .createSignedUrl(video,3600)
          setVideoUrl(data?.signedUrl||'')
      }
      fecthUrl();
  }, [video]);
  return (
    <>
    <video src={videoUrl} style={{objectFit:'cover',borderRadius:'15px'}} width="100%" height="100%" controls></video>
    </>
  )
}

export default VideoPlayer