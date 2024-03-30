import EditMeetingModal from "@/components/modal/EditMeetingModal";
import AuthProvider from "@/providers/AuthProvider";

export default function HomeLayout({ children }) {
  return (
    <>
      <EditMeetingModal />
      {children}
    </>
  );
}
