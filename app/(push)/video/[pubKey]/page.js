"use client";

import React, { useEffect, useRef, useState } from "react";

import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CONSTANTS } from "@pushprotocol/restapi";
import { useDispatch } from "react-redux";

import usePush from "@/hooks/usePush";

import RequestVideo from "@/components/video/RequestVideo";
import VideoCallContainer from "@/components/video/VideoCall";
import { setCurrentContact } from "@/redux/slice/PushSlice";
import useMeeting from "@/hooks/useMeeting";

const VideoContainer = ({ params: { pubKey } }) => {
  const { isConnected } = useAccount();
  const { connectStream, connectVideoChat } = usePush();
  const dispatch = useDispatch();
  const { updateMeeting } = useMeeting();

  const videoCall = useRef();
  const router = useRouter();

  const [data, setData] = useState(CONSTANTS.VIDEO.INITIAL_DATA);
  // const [incomingCallerAddress, setIncomingCallerAddress] = useState(null);
  const [isPushStreamConnected, setIsPushStreamConnected] = useState(false);

  const [isJoined, setIsJoined] = useState(false);
  const [acceptedCall, setAcceptedCall] = useState(true);
  const [recipentInfo, setRecipentInfo] = useState({});

  const user = useSelector((state) => state.push.pushSign);
  const activeMeeting = useSelector((state) => state.meeting.activeMeeting);

  const incomingCallerAddress = useSelector(
    (state) => state.meeting.IncomingVideoCall
  );
  const stream = useSelector((state) => state.push.pushStream);
  // console.log("incomingCallerAddress", incomingCallerAddress);

  const initializePushAPI = async () => {
    // await connectStream(
    //   user,
    //   videoCall,
    //   setData,
    //   setIsPushStreamConnected
    //   setIncomingCallerAddress
    // );
    await connectVideoChat(
      stream,
      user,
      videoCall,
      setData
      // setIncomingCallerAddress
    );

    const info = await user.profile.info({
      overrideAccount: pubKey,
    });

    setRecipentInfo(info);
  };

  useEffect(() => {
    if (data?.incoming[0]?.status !== CONSTANTS.VIDEO.STATUS.UNINITIALIZED)
      return;

    if (user) initializePushAPI();
  }, []);

  const requestVideoCall = async () => {
    await videoCall.current.request([pubKey]);
    setIsJoined(true);
    dispatch(setCurrentContact(`eip155:${pubKey}`));
  };

  const acceptIncomingCall = async () => {
    await videoCall.current.approve(incomingCallerAddress);
    dispatch(setCurrentContact(`eip155:${incomingCallerAddress}`));
    setIsJoined(true);
    setAcceptedCall(true);
  };

  const denyIncomingCall = async () => {
    await videoCall.current.deny(incomingCallerAddress);
    router.push("/home");
  };

  const endCall = async () => {
    await videoCall.current.disconnect();

    if (activeMeeting) {
      await updateMeeting(activeMeeting._id, { status: "attended" });
    }

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
            endCall={endCall}
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
