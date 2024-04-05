"use client";

import { useDispatch, useSelector } from "react-redux";

import MeetingHome from "@/components/meeting/MeetingHome";
import IncomingVideoModal from "@/components/modal/IncomingVideoModal";
import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import { clearIncomingVideoCall } from "@/redux/slice/meetingSlice";
import { useRouter } from "next/navigation";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
