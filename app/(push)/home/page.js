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
  const { connectStream } = usePush();

  const user = useSelector((state) => state.push.pushSign);
  const stream = useSelector((state) => state.push.pushStream);

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
    </div>
  );
};

export default Home;
