import { setActiveMeeting } from "@/redux/slice/meetingSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MeetingItemMenu from "./MeetingItemMenu";
import { toast } from "sonner";

const MeetingItem = ({ meeting }) => {
  if (
    meeting.status === "attended" ||
    new Date(meeting.meetingTime) - Date.now() < 3 * 60 * 1000
  ) {
    return null;
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState("");

  const pushSign = useSelector((state) => state.push.pushSign);

  const fetchPushUser = async () => {
    const response = await pushSign.profile.info({
      overrideAccount: meeting.recipientPubKey,
    });
    setData(response);
  };

  useEffect(() => {
    fetchPushUser();

    let interval;

    const updateCountdown = () => {
      const meetingTime = new Date(meeting.meetingTime);
      const now = new Date();
      const diff = meetingTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown("Join Now");
        return;
      }

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
    if (new Date(meeting.meetingTime) - new Date() > 60 * 5000) {
      toast.message(
        "You can join the meeting 5 minutes before the scheduled time"
      );
      return null;
    }

    dispatch(setActiveMeeting(meeting));
    router.push(`/video/${meeting.recipientPubKey}`);
  };

  return (
    data && (
      <li className="flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 rounded-lg py-1.5">
        <div className="w-full" onClick={handleMeetingClick}>
          <div className="flex items-center gap-3">
            <Image
              src={data.picture}
              alt={data.name}
              width={50}
              height={50}
              className="rounded-full"
            />

            <div>
              <p className="font-bold text-lg">
                {data.name ||
                  `${meeting.recipientPubKey.slice(
                    0,
                    6
                  )}...${meeting.recipientPubKey.slice(-4)}`}
              </p>

              {countdown ? (
                countdown === "Join Now" ? (
                  <p className="text-sm text-red-500 w-full font-bold">
                    {countdown}
                  </p>
                ) : (
                  <p className="text-sm text-green-500 w-full font-bold">
                    {countdown}
                  </p>
                )
              ) : (
                <p className="text-sm text-gray-600 w-full">
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
        </div>

        <MeetingItemMenu meeting={meeting} />
      </li>
    )
  );
};

export default MeetingItem;
