import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import {
  updateMeeting as updateMeetingRedux,
  deleteMeeting as deleteMeeingRedux,
  addMeeting,
} from "@/redux/slice/meetingSlice";

import useUser from "./useUser";

const useMeeting = () => {
  const dispatch = useDispatch();
  const { addMeetingToUser } = useUser();

  const pushSign = useSelector((state) => state.push.pushSign);

  const getMeeting = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meeting/${id}`
      );

      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("Meeting not found");
      } else {
        toast.error(`Error fetching meeting: ${err.message}`);
      }
    }
  };

  const createMeeting = async (recipientPubKey, meetingTime, status) => {
    try {
      pushSign.chat.send(recipientPubKey, {
        type: "Text",
        content: `Meeting Initiated. Time: + ${new Date(
          meetingTime
        ).toLocaleTimeString()}`,
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meeting`,
        { recipientPubKey, meetingTime, status }
      );

      dispatch(addMeeting(response.data));
      await addMeetingToUser(pushSign.account, response.data._id);

      toast.success("Meeting created successfully");
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error(`Error creating meeting: ${err.message}`);
      }
    }
  };

  const updateMeeting = async (meetingId, updates) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meeting`,
        { meetingId, ...updates }
      );

      dispatch(updateMeetingRedux(response.data));

      toast.success("Meeting updated successfully");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 404) {
        toast.error("Meeting not found");
      } else {
        toast.error(`Error updating meeting: ${err.message}`);
      }
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meeting`,
        { data: { meetingId } }
      );

      dispatch(deleteMeeingRedux(meetingId));

      toast.success("Meeting deleted successfully");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 404) {
        toast.error("Meeting not found");
      } else {
        toast.error(`Error deleting meeting: ${err.message}`);
      }
    }
  };

  return {
    getMeeting,
    createMeeting,
    updateMeeting,
    deleteMeeting,
  };
};

export default useMeeting;
