import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";

import Image from "next/image";
import { useSelector } from "react-redux";

import VideoPlayer from "./VideoPlayer";

const VideoCallContainer = ({
  data,
  toggleAudio,
  toggleVideo,
  endCall,
  recipentInfo,
  incomingCallerAddress,
}) => {
  const activeMeeting = useSelector((state) => state.meeting.activeMeeting);

  return (
    <section className="flex h-screen w-screen bg-black">
      <div className="relative rounded-lg overflow-hidden h-fit w-full">
        <VideoPlayer
          stream={data?.incoming[0]?.stream}
          isMuted={true}
          height="100vh"
          width="auto"
          classStyle="rounded-lg aspect-video border-2 border-gray-500 bg-black m-0"
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {data?.incoming[0]?.video || (
            <div className="flex items-center flex-col gap-1">
              <VideoOff size={32} color="white" />

              <p className="text-white text-xl">Camera Off</p>
            </div>
          )}
        </div>

        <div className="absolute top-4 right-6 bg-gray-600 rounded-full p-1.5">
          {data?.incoming[0]?.audio ? (
            <Mic size={24} color="white" />
          ) : (
            <MicOff size={24} color="white" />
          )}
        </div>

        <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
          <div
            className="rounded-full p-4 cursor-pointer transition-colors"
            style={{
              backgroundColor: data?.local.audio
                ? "rgba(0, 0, 0, 0.3)"
                : "#FF5733",
              border: data?.local.audio
                ? "1px solid white"
                : "1px solid transparent",
            }}
            onClick={toggleAudio}
          >
            {data?.local.audio ? (
              <Mic size={24} color="white" />
            ) : (
              <MicOff size={24} color="white" />
            )}
          </div>

          <div
            className="rounded-full p-4 cursor-pointer transition-colors"
            style={{
              backgroundColor: data?.local.video
                ? "rgba(0, 0, 0, 0.3)"
                : "#FF5733",
              border: data?.local.video
                ? "1px solid white"
                : "1px solid transparent",
            }}
            onClick={toggleVideo}
          >
            {data?.local.video ? (
              <Video size={24} color="white" />
            ) : (
              <VideoOff size={24} color="white" />
            )}
          </div>

          <div
            className="rounded-full p-4 cursor-pointer transition-colors border-[#FF5733] border hover:bg-[#FF5733] hover:border-white group"
            style={{
              color: "#FF5733",
            }}
            onClick={endCall}
          >
            <PhoneOff
              size={24}
              className="transition-colors group-hover:text-white"
            />
          </div>
        </div>

        <div className="bg-gradient-to-b absolute z-10 bottom-0 rotate-180 w-full h-1/6 text-[#00000083]"></div>

        <div className="flex gap-4 absolute left-6 bottom-3 z-20">
          <Image src={recipentInfo.picture} width={32} height={32} alt="" />

          <div className="">
            <p className="text-white font-bold text-sm">{recipentInfo.name}</p>
            <p className="text-white text-sm">
              {incomingCallerAddress || activeMeeting.recipientPubKey}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-20">
          <div className="relative">
            <VideoPlayer
              stream={data.local.stream}
              isMuted={true}
              height="fit-content"
              width="200px"
              classStyle="rounded-lg border-2 border-gray-500 aspect-video bg-black m-0"
            />

            <div className="absolute bottom-2 right-2 bg-gray-600 rounded-full p-1.5">
              {data?.local.audio ? (
                <Mic size={16} color="white" />
              ) : (
                <MicOff size={16} color="white" />
              )}
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {data?.local.video || (
                <div className="flex items-center flex-col">
                  <VideoOff size={24} color="white" />
                  <p className="text-white text-sm">Camera Off</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/12 h-full"></div>
    </section>
  );
};

export default VideoCallContainer;
