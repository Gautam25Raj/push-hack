import MeetingHome from "@/components/meeting/MeetingHome";
import ScheduleContainer from "@/components/schedule/ScheduleContainer";

const Home = () => {
  return (
    <div className="flex">
      <MeetingHome />

      <ScheduleContainer />
    </div>
  );
};

export default Home;
