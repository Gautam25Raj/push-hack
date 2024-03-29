"use client";

import useUser from "@/hooks/useUser";
import { setMeetings } from "@/redux/slice/meetingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Meeting = () => {
  const { getUser } = useUser();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const fetchUser = async () => {
    const data = await getUser("0xD203EC25bD177bd90d0E8E29acd74B4A2c840Aa9");

    dispatch(setMeetings(data.meetings));
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  return <div>Meeting</div>;
};

export default Meeting;
