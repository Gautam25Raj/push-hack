"use client";

import { Button } from "@material-tailwind/react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

import Image from "next/image";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { CONSTANTS } from "@pushprotocol/restapi";

import Logo from "@/components/Logo";

import Copy from "../ui/Copy";
import VideoPlayer from "./VideoPlayer";
import IncomingVideoModal from "../modal/IncomingVideoModal";

import pubkeyMinify from "@/utils/pubkeyMinify";

const RequestVideo = ({
  data,
  incomingCallerAddress,
  acceptIncomingCall,
  denyIncomingCall,
  toggleAudio,
  toggleVideo,
  requestVideoCall,
}) => {
  const userInfo = useSelector((state) => state.push.pushUser);
  const pushSign = useSelector((state) => state.push.pushSign);

  return (
    <section className="p-4 h-screen flex flex-col">
      <div className="flex justify-between">
        <Logo size={40} textSize={"text-xl"} />

        <div className="flex gap-4 items-center">
          <div className="">
            <p className="font-bold">{userInfo.name}</p>
            <p className="text-sm flex gap-2 items-center">
              {pubkeyMinify(pushSign.account)}
              <Copy text={pushSign.account} />
            </p>
          </div>

          <Image
            src={userInfo.picture}
            width={48}
            height={48}
            alt=""
            className="rounded-full"
          />
        </div>
      </div>

      {/* <div>
            <input
              onChange={(e) => setRecipientAddress(e.target.value)}
              value={recipientAddress}
              placeholder="recipient address"
              type="text"
            />
          </div> */}

      <div>
        {/* <button
              onClick={() => {
                requestVideoCall(recipientAddress);
              }}
              disabled={!recipientAddress}
            >
              Request Video Call
            </button>

            <button
              onClick={endCall}
              disabled={data?.incoming[0]?.status !== 3}
            >
              End Video Call
            </button> */}

        {data?.incoming[0]?.status === CONSTANTS.VIDEO.STATUS.CONNECTED &&
          toast.success("Ok")}

        {data.incoming[0].status === CONSTANTS.VIDEO.STATUS.RECEIVED &&
          incomingCallerAddress && (
            <IncomingVideoModal
              callerID={incomingCallerAddress}
              onAccept={acceptIncomingCall}
              onReject={denyIncomingCall}
            />
          )}
      </div>

      {/* <div>
            <p>LOCAL VIDEO: {data?.local.video ? "TRUE" : "FALSE"}</p>
            <p>LOCAL AUDIO: {data?.local.audio ? "TRUE" : "FALSE"}</p>
            <p>INCOMING VIDEO: {data?.incoming[0]?.video ? "TRUE" : "FALSE"}</p>
            <p>INCOMING AUDIO: {data?.incoming[0]?.audio ? "TRUE" : "FALSE"}</p>
          </div> */}

      <div className="w-10/12 mx-auto flex gap-12 flex-grow items-center">
        <div className="relative w-fit rounded-lg overflow-hidden h-fit">
          <div className="bg-gradient-to-b absolute z-10 w-full h-1/6 text-[#00000083]"></div>

          <div className="flex gap-4 absolute left-3 top-2 z-20">
            <Image src="/images/hero.png" width={40} height={40} alt="" />

            <div className="">
              <p className="text-white font-bold">Anoy Roy Chowdhury</p>
              <p className="text-white">0x3afr...456</p>
            </div>
          </div>

          <div className="relative">
            <VideoPlayer
              stream={data.local.stream}
              isMuted={true}
              height={"fit-content"}
              width="50vw"
              classStyle="rounded-lg border-2 border-gray-500 aspect-video bg-black m-0"
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {data?.local.video || (
                <div className="flex items-center flex-col gap-1">
                  <VideoOff size={32} color="white" />

                  <p className="text-white text-xl">Camera Off</p>
                </div>
              )}
            </div>
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
          </div>

          <div className="bg-gradient-to-b absolute z-10 w-full h-1/6 text-[#000000ba] bottom-0 rotate-180"></div>
        </div>

        <div className="flex-1 flex justify-center items-start flex-col gap-4">
          <h2 className="text-3xl font-semibold">Ready to Join the Call?</h2>

          <div className="flex gap-2">
            <Button
              className="bg-gradient-push px-6 py-2 rounded-full text-white text-sm"
              onClick={requestVideoCall}
            >
              Join Now
            </Button>

            <Button className="border border-red-500 px-6 py-2 rounded-full text-red-500 text-sm bg-white">
              End Call
            </Button>
          </div>
        </div>

        {/* <div>
              <h2>Incoming Video</h2>
              <VideoPlayer stream={data.incoming[0].stream} isMuted={false} />
            </div> */}
      </div>
    </section>
  );
};

export default RequestVideo;
