"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useUser from "@/hooks/useUser";

import { setMeetings } from "@/redux/slice/meetingSlice";
import MeetingItem from "./MeetingItem";

const Meeting = () => {
  const { getUser } = useUser();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const meetings = useSelector((state) => state.meeting.meetings);

  const fetchUser = async () => {
    const data = await getUser(user.pubKey);

    dispatch(setMeetings(data.meetings));
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  return meetings.length === 0 ? (
    <ul className="px-3 mt-8 space-y-1.5">
      {meetings.map((meeting) => (
        <MeetingItem key={meeting._id} meeting={meeting} />
      ))}
    </ul>
  ) : (
    <div>Loading...</div>
  );
};

export default Meeting;
