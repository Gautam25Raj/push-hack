"use client";

import ScheduleSelect from "./ScheduleSelect";
import { Calendar, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-tailwind/react";

const meetings = [
  { date: new Date(), title: "Meeting 1" },
  { date: new Date(), title: "Meeting 2" },
];

const ScheduleFilter = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("");
  const [meetingsCount, setMeetingsCount] = useState(0);

  const updateMeetingsCount = (date) => {
    const count = meetings.filter(
      (meeting) => meeting.date.toDateString() === date.toDateString()
    ).length;
    setMeetingsCount(count);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateMeetingsCount(date);
  };

  const handlePrevDay = () => {
    if (selectedDate <= new Date()) return;

    const prevDay = new Date(selectedDate.setDate(selectedDate.getDate() - 1));
    setSelectedDate(prevDay);
    updateMeetingsCount(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate.setDate(selectedDate.getDate() + 1));
    setSelectedDate(nextDay);
    updateMeetingsCount(nextDay);
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

          <Button variant="outlined" color="red" className="p-2.5 rounded-md">
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
