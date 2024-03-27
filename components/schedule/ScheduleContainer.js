import ScheduleFilter from "./ScheduleFilter";
import ScheduleTime from "./ScheduleTime";

const ScheduleContainer = () => {
  return (
    <section className="w-3/12 h-screen">
      <ScheduleTime />

      <ScheduleFilter />
    </section>
  );
};

export default ScheduleContainer;
