"use client";

import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import { CONSTANTS } from "@pushprotocol/restapi";
import { useAccount, useWalletClient } from "wagmi";

import usePush from "@/hooks/usePush";

import VideoPlayer from "./VideoPlayer";
import IncomingVideoModal from "./IncomingVideoModal";
import Logo from "@/components/Logo";

const VideoV2 = () => {
  const { isConnected } = useAccount();
  const { connectStream } = usePush();

  const { data: signer } = useWalletClient();

  const videoCall = useRef();

  const [recipientAddress, setRecipientAddress] = useState("");
  const [data, setData] = useState(CONSTANTS.VIDEO.INITIAL_DATA);
  const [incomingCallerAddress, setIncomingCallerAddress] = useState(null);
  const [isPushStreamConnected, setIsPushStreamConnected] = useState(false);

  const user = useSelector((state) => state.push.pushSign);

  const initializePushAPI = async () => {
    connectStream(
      user,
      videoCall,
      setData,
      setIsPushStreamConnected,
      setIncomingCallerAddress
    );
  };

  useEffect(() => {
    if (!signer) return;

    if (data?.incoming[0]?.status !== CONSTANTS.VIDEO.STATUS.UNINITIALIZED)
      return;

    initializePushAPI();
  }, [signer, data.incoming[0].status]);

  useEffect(() => {
    console.log("isPushStreamConnected", isPushStreamConnected);
  }, [isPushStreamConnected]);

  const requestVideoCall = async (recipient) => {
    await videoCall.current.request([recipient]);
  };

  const acceptIncomingCall = async () => {
    await videoCall.current.approve(incomingCallerAddress);
  };

  const denyIncomingCall = async () => {
    await videoCall.current.deny(incomingCallerAddress);
  };

  const endCall = async () => {
    await videoCall.current.disconnect();
  };

  const toggleVideo = async () => {
    await videoCall.current?.config({ video: !data.local.video });
  };

  const toggleAudio = async () => {
    await videoCall.current?.config({ audio: !data?.local.audio });
  };

  console.log("data", data);

  return (
    <section className="p-4">
      {isConnected ? (
        <div>
          <Logo size={40} textSize={"text-xl"} />

          {/* <div>
            <input
              onChange={(e) => setRecipientAddress(e.target.value)}
              value={recipientAddress}
              placeholder="recipient address"
              type="text"
            />
          </div> */}

          <div>
            <button
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
            </button>

            <button
              disabled={!data.incoming[0]}
              onClick={() => {
                videoCall.current?.config({ video: !data.local.video });
              }}
            >
              Toggle Video
            </button>

            <button
              disabled={!data.incoming[0]}
              onClick={() => {
                videoCall.current?.config({ audio: !data?.local.audio });
              }}
            >
              Toggle Audio
            </button>

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

          <div>
            <p>LOCAL VIDEO: {data?.local.video ? "TRUE" : "FALSE"}</p>
            <p>LOCAL AUDIO: {data?.local.audio ? "TRUE" : "FALSE"}</p>
            <p>INCOMING VIDEO: {data?.incoming[0]?.video ? "TRUE" : "FALSE"}</p>
            <p>INCOMING AUDIO: {data?.incoming[0]?.audio ? "TRUE" : "FALSE"}</p>
          </div>

          <div className="w-10/12 mx-auto flex gap-12">
            <div className="relative w-fit rounded-lg overflow-hidden">
              <div className="bg-gradient-to-b absolute z-10 w-full h-1/6 text-[#00000083]"></div>

              <p></p>

              <VideoPlayer
                stream={data.local.stream}
                isMuted={true}
                height={"fit-content"}
                width="50vw"
              />

              <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                <div
                  className="rounded-full p-3 cursor-pointer transition-colors"
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
                  className="rounded-full p-3 cursor-pointer transition-colors"
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
              <h2 className="text-3xl font-semibold">
                Ready to Join the Call?
              </h2>

              <button
                className="bg-gradient-push px-6 py-2 rounded-full text-white shadow-md"
                onClick={requestVideoCall}
              >
                Join Now
              </button>
            </div>

            {/* <div>
              <h2>Incoming Video</h2>
              <VideoPlayer stream={data.incoming[0].stream} isMuted={false} />
            </div> */}
          </div>
        </div>
      ) : (
        "Please connect your wallet."
      )}
    </section>
  );
};

export default VideoV2;
