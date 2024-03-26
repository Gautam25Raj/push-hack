"use client";

import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { CONSTANTS } from "@pushprotocol/restapi";
import { useAccount, useWalletClient } from "wagmi";

import usePush from "@/hooks/usePush";

import RequestVideo from "@/components/video/RequestVideo";
import VideoCallContainer from "@/components/video/VideoCall";

const VideoV2 = () => {
  const { isConnected } = useAccount();
  const { connectStream } = usePush();

  const { data: signer } = useWalletClient();

  const videoCall = useRef();

  const [recipientAddress, setRecipientAddress] = useState("");
  const [data, setData] = useState(CONSTANTS.VIDEO.INITIAL_DATA);
  const [incomingCallerAddress, setIncomingCallerAddress] = useState(null);
  const [isPushStreamConnected, setIsPushStreamConnected] = useState(false);

  const [isJoined, setIsJoined] = useState(false);
  const [acceptedCall, setAcceptedCall] = useState(true);

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

    // initializePushAPI();
  }, []);

  useEffect(() => {
    console.log("isPushStreamConnected", isPushStreamConnected);
  }, [isPushStreamConnected]);

  const requestVideoCall = async (recipient) => {
    await videoCall.current.request([recipient]);
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

export default VideoV2;
