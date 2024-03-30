"use client";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

import { toast } from "sonner";
import { useState } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";

import useMeeting from "@/hooks/useMeeting";
import { useSelector } from "react-redux";

const MeetingForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [recipientPubKey, setRecipientPubKey] = useState("");

  const pushSign = useSelector((state) => state.push.pushSign);

  const { createMeeting } = useMeeting();

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
      await createMeeting(recipientPubKey, meetingDateTime, "not attended");

      setRecipientPubKey("");
      setSelectedDate(new Date());
      setHours(0);
      setMinutes(0);
    } catch (error) {
      toast.error(`Error creating meeting: ${error.message}`);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex items-center justify-center mt-20"
    >
      <Typography variant="h4" color="blue-gray">
        Create Meeting
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
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

          <Typography variant="h6" color="blue-gray" className="-mb-3">
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

          <Typography variant="h6" color="blue-gray" className="-mb-3">
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

        <Button className="mt-6" fullWidth onClick={handleFormSubmit}>
          Create Meeting
        </Button>
      </form>
    </Card>
  );
};

export default MeetingForm;
