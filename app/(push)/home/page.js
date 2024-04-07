"use client";

import { useDispatch, useSelector } from "react-redux";

import MeetingHome from "@/components/meeting/MeetingHome";
import IncomingVideoModal from "@/components/modal/IncomingVideoModal";
import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import {
  clearIncomingVideoCall,
  clearShowJoinedCall,
  setIncomingVideoCall,
  setShowJoinedCall,
} from "@/redux/slice/meetingSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import usePush from "@/hooks/usePush";
import { setCurrentContact, setPushStrean } from "@/redux/slice/PushSlice";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { connectStream } = usePush();

  const user = useSelector((state) => state.push.pushSign);
  const stream = useSelector((state) => state.push.pushStream);
  const showJoinedCall = useSelector((state) => state.meeting.showJoinedCall);

  const incomingCallerAddress = useSelector(
    (state) => state.meeting.IncomingVideoCall
  );

  const acceptIncomingCall = () => {
    router.push(`/video/${incomingCallerAddress}`);
    dispatch(setIncomingVideoCall(incomingCallerAddress));
    dispatch(setShowJoinedCall(true));
  };

  const denyIncomingCall = () => {
    dispatch(clearIncomingVideoCall());
    dispatch(clearShowJoinedCall());
  };

  useEffect(() => {
    const initializePushAPI = async () => {
      const stream = await connectStream(user);
      dispatch(setPushStrean(stream));
    };

    if (user && !stream) initializePushAPI();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      const aliceChats = await user.chat.list("CHATS");

      dispatch(setCurrentContact(aliceChats));
    };

    if (user) fetchContacts();
  }, []);

  return (
    <div className="flex">
      <MeetingHome />

      <ScheduleContainer />

      {incomingCallerAddress && !showJoinedCall && (
        <IncomingVideoModal
          callerID={incomingCallerAddress}
          onAccept={acceptIncomingCall}
          onReject={denyIncomingCall}
        />
      )}
    </div>
  );
};

export default Home;
