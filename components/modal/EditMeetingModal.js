"use client";

import useMeeting from "@/hooks/useMeeting";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import DatePicker from "react-datepicker";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Plus } from "lucide-react";
import { toggleEditMeeting } from "@/redux/slice/modalSlice";
import { clearSelectedMeeting } from "@/redux/slice/meetingSlice";

const EditMeetingModal = () => {
  const dispatch = useDispatch();

  const pushSign = useSelector((state) => state.push.pushSign);
  const open = useSelector((state) => state.modals.isEditModal);
  const selectedMeeting = useSelector((state) => state.meeting.selectedMeeting);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [recipientPubKey, setRecipientPubKey] = useState("");

  useEffect(() => {
    if (selectedMeeting) {
      setSelectedDate(new Date(selectedMeeting.meetingTime));
      setHours(new Date(selectedMeeting.meetingTime).getHours());
      setMinutes(new Date(selectedMeeting.meetingTime).getMinutes());
      setRecipientPubKey(selectedMeeting.recipientPubKey);
    }
  }, [selectedMeeting]);

  const { updateMeeting } = useMeeting();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleHoursFocus = () => {
    setHours("");
  };

  const handleHoursBlur = () => {
    if (hours === "") {
      setHours(new Date().getHours());
    }
  };

  const handleMinutesFocus = () => {
    setMinutes("");
  };

  const handleMinutesBlur = () => {
    if (minutes === "") {
      setMinutes(new Date().getMinutes());
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (pushSign.account === recipientPubKey) {
      toast.info("Cannot create meeting with yourself");
      return;
    }

    const now = new Date();
    const meetingDateTime = new Date(selectedDate.setHours(hours, minutes));

    if (
      recipientPubKey === "" ||
      selectedDate === "" ||
      hours === "" ||
      minutes === ""
    ) {
      toast.info("Please fill all fields");
      return;
    }

    if (meetingDateTime < now) {
      toast.info("Cannot set meeting time to a past time");
      return;
    }

    try {
      await updateMeeting(selectedMeeting._id, {
        recipientPubKey,
        meetingTime: meetingDateTime,
      });

      setRecipientPubKey("");
      setSelectedDate(new Date());
      setHours(0);
      setMinutes(0);
      dispatch(clearSelectedMeeting());
      dispatch(toggleEditMeeting());
    } catch (error) {
      toast.error(`Error creating meeting: ${error.message}`);
    }
  };

  const handleClose = () => {
    dispatch(toggleEditMeeting());
  };

  return (
    open && (
      <div className="absolute top-0 left-0 h-full w-full backdrop-filter backdrop-blur-md z-50 bg-black/10">
        <div className=" flex justify-center h-full items-center ">
          <div className="w-[520px] flex items-center justify-center shadow-lg">
            <div className="w-full rounded-lg p-[0.5px] border border-gray-400">
              <div className={"h-full w-full rounded-lg bg-white "}>
                <Card
                  className={
                    "h-full w-full rounded-lg bg-white p-5 flex items-center"
                  }
                >
                  <div className="flex justify-between w-full">
                    <p className="text-2xl font-bold">Update Meeting</p>

                    <Button
                      className="p-2 hover:bg-gray-200 bg-transparent shadow-none flex items-center justify-center"
                      onClick={handleClose}
                    >
                      <Plus size={20} className="rotate-45" color="black" />
                    </Button>
                  </div>

                  <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Recipient Address
                      </Typography>

                      <Input
                        size="lg"
                        value={recipientPubKey}
                        onChange={(e) => setRecipientPubKey(e.target.value)}
                        placeholder="0x9a4jRapt...oPsr"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />

                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Meeting Date
                      </Typography>

                      <div className="flex gap-2 items-center">
                        <Input
                          size="lg"
                          value={new Date(selectedDate).toLocaleDateString()}
                          readOnly
                          placeholder=""
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />

                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          popperPlacement="bottom-end"
                          customInput={
                            <Button className="p-2.5 rounded-md">
                              <Calendar size={20} />
                            </Button>
                          }
                          minDate={new Date()}
                        />
                      </div>

                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Meeting Time
                      </Typography>

                      <div className="flex gap-2 items-center create-meeting">
                        <Input
                          type="number"
                          size="md"
                          value={hours}
                          onChange={handleHoursChange}
                          onFocus={handleHoursFocus}
                          onBlur={handleHoursBlur}
                          min={0}
                          max={23}
                          placeholder="Hours"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-0 flex-1"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />

                        <span>Hours</span>

                        <Input
                          type="number"
                          size="md"
                          value={minutes}
                          onChange={handleMinutesChange}
                          onFocus={handleMinutesFocus}
                          onBlur={handleMinutesBlur}
                          min={0}
                          max={59}
                          placeholder="Minutes"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-0 flex-1"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />

                        <span>Minutes</span>
                      </div>
                    </div>

                    <Button
                      className="mt-6"
                      fullWidth
                      onClick={handleFormSubmit}
                    >
                      Update Meeting
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditMeetingModal;
