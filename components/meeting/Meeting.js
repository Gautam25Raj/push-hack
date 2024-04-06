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
    console.log(data.meetings);
    const sortedMeetings = data.meetings.sort(
      (a, b) => new Date(a.meetingTime) - new Date(b.meetingTime)
    );
    console.log(sortedMeetings);
    dispatch(setMeetings(sortedMeetings));
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  return meetings.length === 0 ? (
    <ul className="px-3 mt-8 space-y-1.5">
      <li>No Meeting found</li>
    </ul>
  ) : (
    <ul className="px-3 mt-8 space-y-1.5 overflow-scroll flex-grow">
      {meetings.map((meeting) => (
        <MeetingItem key={meeting._id} meeting={meeting} />
      ))}
    </ul>
  );
};

export default Meeting;
