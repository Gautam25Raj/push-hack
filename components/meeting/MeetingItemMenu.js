"use client";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

import { useDispatch } from "react-redux";
import { EllipsisVertical } from "lucide-react";

import { toggleEditMeeting } from "@/redux/slice/modalSlice";
import { setSelectedMeeting } from "@/redux/slice/meetingSlice";

import useMeeting from "@/hooks/useMeeting";

const MeetingItemMenu = ({ meeting }) => {
  const dispatch = useDispatch();

  const { deleteMeeting } = useMeeting();

  const handleEditMeeting = () => {
    dispatch(setSelectedMeeting(meeting));
    dispatch(toggleEditMeeting());
  };

  const handleDeleteMeeting = async () => {
    await deleteMeeting(meeting._id);
  };

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button className="hover:bg-gray-50 bg-gray-200 p-1.5">
          <EllipsisVertical size={16} color="black" />
        </Button>
      </MenuHandler>

      <MenuList>
        <MenuItem onClick={handleEditMeeting}>Edit Meeting</MenuItem>
        <MenuItem onClick={handleDeleteMeeting}>Delete Meeting</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MeetingItemMenu;
