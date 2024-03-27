import { Select, Option } from "@material-tailwind/react";

const ScheduleSelect = ({ filter, onFilterChange }) => {
  const handleChange = (val) => {
    onFilterChange(val);
  };

  return (
    <div className="flex-1 max-w-[254px]">
      <Select label="Meetings" value={filter} onChange={handleChange}>
        <Option value="thisWeek">This Week</Option>
        <Option value="thisMonth">This Month</Option>
      </Select>
    </div>
  );
};

export default ScheduleSelect;
