import EditMeetingModal from "@/components/modal/EditMeetingModal";

export default function HomeLayout({ children }) {
  return (
    <>
      <EditMeetingModal />

      {children}
    </>
  );
}
