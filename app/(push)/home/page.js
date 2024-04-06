"use client";

import { useDispatch, useSelector } from "react-redux";

import MeetingHome from "@/components/meeting/MeetingHome";
import IncomingVideoModal from "@/components/modal/IncomingVideoModal";
import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import { clearIncomingVideoCall } from "@/redux/slice/meetingSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import usePush from "@/hooks/usePush";
import { setPushStrean } from "@/redux/slice/PushSlice";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connectStream } = usePush();

  const user = useSelector((state) => state.push.pushSign);
  const stream = useSelector((state) => state.push.pushStream);

  const IncomingVideoCall = useSelector(
    (state) => state.meeting.IncomingVideoCall
  );

  const onAccept = async () => {
    router.push(`/video/${IncomingVideoCall}`);
    dispatch(clearIncomingVideoCall());
  };

  const onReject = async () => {
    dispatch(clearIncomingVideoCall());
  };

  useEffect(() => {
    const initializePushAPI = async () => {
      const stream = await connectStream(user);
      dispatch(setPushStrean(stream));
    };

    if (user && !stream) initializePushAPI();

    return () => {
      dispatch(clearIncomingVideoCall());
    };
  }, []);

  return (
    <div className="flex">
      <MeetingHome />

      <ScheduleContainer />

      {IncomingVideoCall && (
        <IncomingVideoModal
          callerID={IncomingVideoCall}
          onAccept={onAccept}
          onReject={onReject}
        />
      )}
    </div>
  );
};

export default Home;
