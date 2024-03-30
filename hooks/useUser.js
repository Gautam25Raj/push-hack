import axios from "axios";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "@/redux/slice/userSlice";

const useUser = () => {
  const dispatch = useDispatch();

  const getUser = async (pubKey) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${pubKey}`
      );

      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("User not found");
      } else {
        toast.error(`Error fetching user: ${err.message}`);
      }
    }
  };

  const createUser = async (pubKey) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        { pubKey }
      );

      dispatch(setUser(response.data));
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error(`Error creating user: ${err.message}`);
      }
    }
  };

  const addMeetingToUser = async (account, meetingId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/addMeeting`,
        {
          pubKey: account,
          meetingId,
        }
      );

      dispatch(setUser(response.data));
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 404) {
        toast.error(err.response.data.message);
      } else {
        toast.error(`Error adding meeting: ${err.message}`);
      }
    }
  };

  const deleteUserMeeting = async (pubKey, meetingId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        {
          data: { pubKey, meetingId },
        }
      );

      dispatch(setUser(response.data));

      toast.success("Meeting deleted successfully");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 404) {
        toast.error(err.response.data.message);
      } else {
        toast.error(`Error deleting meeting: ${err.message}`);
      }
    }
  };

  return {
    getUser,
    createUser,
    addMeetingToUser,
    deleteUserMeeting,
  };
};

export default useUser;
