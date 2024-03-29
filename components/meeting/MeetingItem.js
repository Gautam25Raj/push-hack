import { setActiveMeeting } from "@/redux/slice/meetingSlice";
import { Button } from "@material-tailwind/react";
import { ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MeetingItem = ({ meeting }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState("");

  const pushSign = useSelector((state) => state.push.pushSign);

  const fetchPushUser = async () => {
    const response = await pushSign.profile.info(meeting.recipientPubKey);
    setData(response);
  };

  useEffect(() => {
    fetchPushUser();

    let interval;

    const updateCountdown = () => {
      const meetingTime = new Date(meeting.meetingTime);
      const now = new Date();
      const diff = meetingTime - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (interval) {
        clearInterval(interval);
      }

      if (days === 0) {
        if (hours >= 1) {
          interval = setInterval(updateCountdown, 1000 * 60);
          setCountdown(`${hours}H ${minutes}M`);
        } else {
          interval = setInterval(updateCountdown, 1000);
          setCountdown(`${minutes}M ${seconds}S`);
        }
      }
    };

    updateCountdown();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const handleMeetingClick = async () => {
    dispatch(setActiveMeeting(meeting));
    router.push(`/video/${meeting.recipientPubKey}`);
  };

  return (
    data && (
      <li
        className="flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 rounded-lg py-1.5"
        onClick={handleMeetingClick}
      >
        <div className="flex items-center gap-3">
          <Image
            src={data.picture}
            alt={data.name}
            width={50}
            height={50}
            className="rounded-full"
          />

          <div>
            <p className="font-bold text-lg">{data.name}</p>

            {countdown ? (
              <p className="text-sm text-gray-600">{countdown}</p>
            ) : (
              <p className="text-sm text-gray-600">
                {new Date(meeting.meetingTime).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "2-digit",
                })}{" "}
                {new Date(meeting.meetingTime).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>

        <ChevronRight size={24} />
      </li>
    )
  );
};

export default MeetingItem;
