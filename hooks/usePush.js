"use client";

import { useDispatch } from "react-redux";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { useSelector } from "react-redux";

import {
  setPushSign,
  setPushUser,
  setRecentContact,
  setRecentRequest,
  updateMessages,
} from "@/redux/slice/PushSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  clearIncomingVideoCall,
  setInstantMeeting as reduxSetInstantMeeting,
  setIncomingVideoCall,
} from "@/redux/slice/meetingSlice";

import useMeeting from "@/hooks/useMeeting";

export default function usePush() {
  const dispatch = useDispatch();
  const router = useRouter();
  const signer = useEthersSigner();
  const { createMeeting, updateMeeting } = useMeeting();

  const initializePush = async () => {
    try {
      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.PROD,
      });

      if (user.errors.length > 0)
        throw new Error("Error initializing push protocol");

      const userInfo = await user.profile.info();

      dispatch(setPushSign(user));
      dispatch(setPushUser(userInfo));

      return user;
    } catch (error) {
      toast.error("Request Rejected");
      throw new Error("Error initializing push protocol");
    }
  };

  const handleChatEvent = (user, data) => {
    if (data.event.includes("message")) {
      console.log(data);
      dispatch(
        updateMessages({
          fromDID: data.from,
          timestamp: data.timestamp,
          messageContent: data.message.content,
          messageType: data.message.type,
        })
      );

      if (
        data.message.content.includes("Meeting Initiated") &&
        user.account !== data.from.split(":")[1]
      ) {
        toast.info("A new Meeting has been created with you.");

        createMeeting(
          data.from.split(":")[1],
          data.message.content.split("MeetingTime:")[1],
          "not attended",
          false
        );
      }

      if (
        data.message.content.includes("Instant") &&
        user.account !== data.from.split(":")[1]
      ) {
        toast.info("Join Instant Meeting now.");
        dispatch(reduxSetInstantMeeting(true));
        router.push(`/video/${data.from.split(":")[1]}`);
      }
    } else if (data.event.includes("request")) {
      user.chat.list("REQUESTS").then((requests) => {
        const filterRecentRequest = requests.map((request) => ({
          profilePicture: request.profilePicture,
          did: request.did,
          msg: request.msg.messageContent,
          name: request.name,
          about: request.about,
        }));

        dispatch(setRecentRequest(filterRecentRequest));
      });
    } else if (data.event.includes("accept")) {
      user.chat.list("CHATS").then((chats) => {
        const filterRecentContact = chats.map((chat) => ({
          profilePicture: chat.profilePicture,
          did: chat.did,
          name: chat.name,
          about: chat.about,
          chatId: chat.chatId,
          msg: {
            content: chat.msg.messageContent,
            timestamp: chat.msg.timestamp,
            fromDID: chat.msg.fromDID,
          },
        }));

        dispatch(setRecentContact(filterRecentContact));
      });
    } else {
      toast.error("Error in chat event");
    }
  };

  const handleVideoEvent = async (data, setIncomingCallerAddress) => {
    if (data.event === CONSTANTS.VIDEO.EVENT.REQUEST) {
      console.log(data);
      // setIncomingCallerAddress(data.peerInfo.address);
      // router.push(`/video/${data.peerInfo.address}`);
      dispatch(setIncomingVideoCall(data.peerInfo.address));
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.APPROVE) {
      console.log(data);
      console.log("Video Call Approved");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.DENY) {
      console.log(data);
      router.push(`/`);
      toast.info("Video Call Denied");
      dispatch(clearIncomingVideoCall());
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.CONNECT) {
      console.log(data);
      console.log("Video Call Connected");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.DISCONNECT) {
      console.log(data);
      toast.info("Video Call ended by the user");
      dispatch(clearIncomingVideoCall());
      router.push("/");
      router.refresh();
    }
  };

  const connectStream = async (
    user,
    videoCall,
    setData,
    setIsPushStreamConnected,
    setIncomingCallerAddress
  ) => {
    const stream = await user.initStream([
      CONSTANTS.STREAM.CHAT,
      CONSTANTS.STREAM.VIDEO,
      CONSTANTS.STREAM.NOTIF,
      CONSTANTS.STREAM.CONNECT,
      CONSTANTS.STREAM.DISCONNECT,
    ]);

    console.log("Stream Initialized");

    stream.on(CONSTANTS.STREAM.CONNECT, () => {
      // setIsPushStreamConnected(true);
      console.log("Stream Connected");
    });

    stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
      // setIsPushStreamConnected(false);
      console.log("Stream Disconnected");
    });

    stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
      console.log(data);
    });

    stream.on(CONSTANTS.STREAM.CHAT, async (data) => {
      handleChatEvent(user, data);
    });

    stream.on(CONSTANTS.STREAM.VIDEO, async (data) => {
      handleVideoEvent(data);
    });

    // stream.on(CONSTANTS.STREAM.VIDEO, async (data) => {
    //   handleVideoEvent(data, setIncomingCallerAddress);
    // });

    // videoCall.current = await user.video.initialize(setData, {
    //   stream: stream,

    //   config: {
    //     video: true,
    //     audio: true,
    //   },
    // });

    await stream.connect();
    return stream;
  };

  const connectVideoChat = async (
    stream,
    user,
    videoCall,
    setData
    // setIncomingCallerAddress
  ) => {
    videoCall.current = await user.video.initialize(setData, {
      stream: stream,

      config: {
        video: true,
        audio: true,
      },
    });
  };

  return {
    initializePush,
    connectStream,
    connectVideoChat,
  };
}
