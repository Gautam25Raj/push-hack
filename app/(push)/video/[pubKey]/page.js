"use client";

import React, { useEffect, useRef, useState } from "react";

import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CONSTANTS } from "@pushprotocol/restapi";

import usePush from "@/hooks/usePush";

import RequestVideo from "@/components/video/RequestVideo";
import VideoCallContainer from "@/components/video/VideoCall";

const VideoContainer = ({ params: { pubKey } }) => {
  const { isConnected } = useAccount();
  const { connectStream } = usePush();

  const videoCall = useRef();
  const router = useRouter();

  const [data, setData] = useState(CONSTANTS.VIDEO.INITIAL_DATA);
  const [incomingCallerAddress, setIncomingCallerAddress] = useState(null);
  const [isPushStreamConnected, setIsPushStreamConnected] = useState(false);

  const [isJoined, setIsJoined] = useState(false);
  const [acceptedCall, setAcceptedCall] = useState(true);
  const [recipentInfo, setRecipentInfo] = useState({});

  const user = useSelector((state) => state.push.pushSign);

  const initializePushAPI = async () => {
    await connectStream(
      user,
      videoCall,
      setData,
      setIsPushStreamConnected,
      setIncomingCallerAddress
    );

    const info = await user.profile.info({
      overrideAccount: pubKey,
    });

    setRecipentInfo(info);
  };

  useEffect(() => {
    if (data?.incoming[0]?.status !== CONSTANTS.VIDEO.STATUS.UNINITIALIZED)
      return;

    initializePushAPI();
  }, []);

  useEffect(() => {
    console.log("isPushStreamConnected", isPushStreamConnected);
  }, [isPushStreamConnected]);

  const requestVideoCall = async () => {
    await videoCall.current.request([pubKey]);
    setIsJoined(true);
  };

  const acceptIncomingCall = async () => {
    await videoCall.current.approve(incomingCallerAddress);
    setIsJoined(true);
    setAcceptedCall(true);
  };

  const denyIncomingCall = async () => {
    await videoCall.current.deny(incomingCallerAddress);
  };

  const endCall = async () => {
    await videoCall.current.disconnect();
    router.push("/");
    setIsJoined(false);
    setAcceptedCall(false);
  };

  const toggleVideo = async () => {
    await videoCall.current?.config({ video: !data.local.video });
  };

  const toggleAudio = async () => {
    await videoCall.current?.config({ audio: !data?.local.audio });
  };

  return (
    <>
      {isConnected ? (
        isJoined ? (
          <VideoCallContainer
            data={data}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            endCall={endCall}
            recipentInfo={recipentInfo}
            incomingCallerAddress={incomingCallerAddress}
          />
        ) : (
          <RequestVideo
            data={data}
            incomingCallerAddress={incomingCallerAddress}
            acceptIncomingCall={acceptIncomingCall}
            denyIncomingCall={denyIncomingCall}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            requestVideoCall={requestVideoCall}
          />
        )
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </>
  );
};

export default VideoContainer;
