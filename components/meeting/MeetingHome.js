import Logo from "../Logo";
import ContactsTab from "../contacts/ContactsTab";
import MyProfile from "../ui/MyProfile";
import MeetingForm from "./MeetingForm";

const MeetingHome = () => {
  return (
    <section className="p-4 flex-1 w-9/12 border-r border-gray-400">
      <header className="flex justify-between items-start">
        <Logo size={40} textSize={"text-xl"} />

        <MyProfile />
      </header>

      <div className="flex">
        <ContactsTab />
        <MeetingForm />
      </div>
    </section>
  );
};

export default MeetingHome;
