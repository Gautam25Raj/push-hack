"use client";

import { useDispatch } from "react-redux";
import { useEthersSigner } from "@/wagmi/EthersSigner";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

import {
  setPushSign,
  setPushUser,
  setRecentContact,
  setRecentRequest,
  updateMessages,
} from "@/redux/slice/PushSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function usePush() {
  const dispatch = useDispatch();
  const router = useRouter();
  const signer = useEthersSigner();

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

  const handleVideoEvent = (data, setIncomingCallerAddress) => {
    if (data.event === CONSTANTS.VIDEO.EVENT.REQUEST) {
      console.log(data);
      setIncomingCallerAddress(data.peerInfo.address);
      dispatch(setIncomingVideoCall(data.peerInfo.address));
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.APPROVE) {
      console.log(data);
      console.log("Video Call Approved");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.DENY) {
      console.log(data);
      toast.info("Video Call Denied");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.CONNECT) {
      console.log(data);
      console.log("Video Call Connected");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.DISCONNECT) {
      console.log(data);
      toast.info("Video Call ended by the user");
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
      setIsPushStreamConnected(true);
      console.log("Stream Connected");
    });

    stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
      setIsPushStreamConnected(false);
      console.log("Stream Disconnected");
    });

    stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
      console.log(data);
    });

    stream.on(CONSTANTS.STREAM.CHAT, async (data) => {
      handleChatEvent(user, data);
    });

    stream.on(CONSTANTS.STREAM.VIDEO, async (data) => {
      handleVideoEvent(data, setIncomingCallerAddress);
    });

    videoCall.current = await user.video.initialize(setData, {
      stream: stream,

      config: {
        video: true,
        audio: true,
      },
    });

    await stream.connect();
  };

  const connectVideoChat = async (user) => {
    const stream = await user.initStream([CONSTANTS.STREAM.VIDEO], {});

    const aliceVideoCall = await user.video.initialize(setData, {
      stream: stream,

      config: {
        video: true,
        audio: true,
      },
    });

    stream.on(CONSTANTS.STREAM.VIDEO, async (data) => {
      handleVideoEvent(aliceVideoCall, data);
    });

    return aliceVideoCall;
  };

  return {
    initializePush,
    connectStream,
    connectVideoChat,
  };
}
