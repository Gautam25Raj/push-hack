import Meeting from "../meeting/Meeting";
import ScheduleTime from "./ScheduleTime";
import ScheduleFilter from "./ScheduleFilter";

const ScheduleContainer = () => {
  return (
    <section className="w-3/12 h-screen overflow-hidden flex flex-col">
      <ScheduleTime />

      <ScheduleFilter />

      <Meeting />
    </section>
  );
};

export default ScheduleContainer;
