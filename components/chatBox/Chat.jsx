"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/slice/PushSlice";
import MessageWithDate from "./message/MessageWithDate";

const Chat = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pushSign = useSelector((state) => state.push.pushSign);
  const messageHistory = useSelector((state) => state.push.messages);
  const currentContact = useSelector((state) => state.push.currentContact);

  const initializeChat = async () => {
    try {
      const pastMessages = await pushSign.chat.history(
        currentContact.split(":")[1]
      );

      const filteredMessages = pastMessages.map(
        ({ fromDID, timestamp, messageContent, messageType, chatId }) => ({
          chatId,
          fromDID,
          timestamp,
          messageContent,
          messageType,
        })
      );

      dispatch(setMessages([...filteredMessages].reverse()));
      setLoading(false);
    } catch (err) {
      toast.error("Error fetching chat history");
    }
  };

  useEffect(() => {
    if (currentContact && pushSign) {
      setLoading(true);
      initializeChat();
    }
  }, [currentContact, pushSign]);

  return (
    <div className="flex absolute top-0 left-0 overflow-y-auto w-full h-full flex-grow flex-1 flex-col-reverse hide-scroll px-3 pb-2">
      {loading ? (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-fit mx-auto">
          <Image
            src="/assets/loading.svg"
            alt="Loading spinner"
            width={24}
            height={24}
            className="animate-spin opacity-60"
          />
        </div>
      ) : messageHistory.length === 0 ? (
        <div className="flex text-primary-white/60 py-2 px-6 bg-gray-100 rounded-lg mt-2 items-start">
          <p className="text-sm text-center flex mx-auto">
            Messages are end-to-end encrypted. Only users in this chat can view
            or listen to them.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 z-10">
          {messageHistory.map((message, index, arr) => (
            <MessageWithDate
              key={index}
              index={index}
              message={message}
              nextMessage={arr[index + 1]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
