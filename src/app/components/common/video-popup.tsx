import React from "react";
import ModalVideo from "react-modal-video";

// prop type
type IPropType = {
  isVideoOpen: boolean;
  setIsVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoId: string;
};


const VideoPopup = ({
  isVideoOpen,
  setIsVideoOpen,
  videoId ,
}: IPropType) => {
  console.log(videoId);
  return (
    <ModalVideo
      channel="custom"
      isOpen={isVideoOpen}
      url={videoId as string}
      onClose={() => setIsVideoOpen(false)}
    />
  );
};

export default VideoPopup;
