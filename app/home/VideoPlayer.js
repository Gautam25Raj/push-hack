import { useEffect, useRef } from "react";

const VideoPlayer = ({ width, height, stream, isMuted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [videoRef, stream]);

  return (
    <video
      className="rounded-lg border-2 border-gray-300 aspect-video"
      style={{ width, height }}
      ref={videoRef}
      muted={isMuted}
      autoPlay
    />
  );
};

export default VideoPlayer;
