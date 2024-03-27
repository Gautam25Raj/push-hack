"use client";

import { Button } from "@material-tailwind/react";
import { Calendar, ChevronLeft, ChevronRight, Trash } from "lucide-react";

import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import ScheduleSelect from "./ScheduleSelect";

const meetings = [
  { date: new Date(), title: "Meeting 1" },
  { date: new Date(), title: "Meeting 2" },
];

const ScheduleFilter = () => {
  const [filter, setFilter] = useState("");
  const [meetingsCount, setMeetingsCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const updateMeetingsCount = (date) => {
    const count = meetings.filter(
      (meeting) => meeting.date.toDateString() === date.toDateString()
    ).length;
    setMeetingsCount(count);
  };

  const updateMeetingsRangeCount = (date) => {
    const count = meetings.filter((meeting) => {
      const meetingDateUnix = new Date(meeting.date).getTime();
      const dateUnix = new Date(date).getTime();
      return meetingDateUnix <= dateUnix;
    }).length;

    setMeetingsCount(count);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);

    const today = new Date();
    let date;

    switch (filter) {
      case "thisWeek":
        date = new Date(today);
        date.setDate(today.getDate() + (7 - today.getDay()));
        break;
      case "thisMonth":
        date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        date = today;
    }

    setSelectedDate(date);
    updateMeetingsRangeCount(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateMeetingsCount(date);
  };

  const handlePrevDay = () => {
    if (selectedDate <= new Date()) {
      setRange([]);
      return;
    }

    const prevDay = new Date(selectedDate.setDate(selectedDate.getDate() - 1));
    setSelectedDate(prevDay);
    updateMeetingsCount(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate.setDate(selectedDate.getDate() + 1));
    setSelectedDate(nextDay);
    updateMeetingsCount(nextDay);
  };

  const handleReset = () => {
    setSelectedDate(new Date());
    setFilter("");
    updateMeetingsCount(new Date());
  };

  useEffect(() => {
    updateMeetingsCount(selectedDate);
  }, []);

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const dateLabel = isToday ? "Today" : selectedDate.toLocaleDateString();

  return (
    <div className="mt-4 px-4 space-y-3">
      <div className="flex items-center gap-3">
        <ScheduleSelect onFilterChange={handleFilterChange} />

        <div className="space-x-1">
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

          <Button
            variant="outlined"
            color="red"
            className="p-2.5 rounded-md"
            onClick={handleReset}
          >
            <Trash size={20} color="red" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 justify-center">
        <Button
          className="p-1 rounded-md"
          onClick={handlePrevDay}
          disabled={isToday}
        >
          <ChevronLeft size={20} />
        </Button>

        <p className="text-center">
          <span className="font-bold">{dateLabel}</span> - {meetingsCount}{" "}
          Meetings
        </p>

        <Button className="p-1 rounded-md" onClick={handleNextDay}>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ScheduleFilter;
