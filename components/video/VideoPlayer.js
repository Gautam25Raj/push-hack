import { useEffect, useRef } from "react";

const VideoPlayer = ({ width, height, stream, isMuted, classStyle }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [videoRef, stream]);

  return (
    <video
      className={classStyle}
      style={{ width, height }}
      ref={videoRef}
      muted={isMuted}
      autoPlay
    />
  );
};

export default VideoPlayer;
