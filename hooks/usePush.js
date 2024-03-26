"use client";

import { useEthersSigner } from "@/wagmi/EthersSigner";
import { useDispatch } from "react-redux";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

import {
  setPushSign,
  setRecentContact,
  setRecentRequest,
  updateMessages,
} from "@/redux/slice/PushSlice";
import { toast } from "sonner";

export default function usePush() {
  const dispatch = useDispatch();
  const signer = useEthersSigner();

  const initializePush = async () => {
    try {
      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.PROD,
      });

      if (user.errors.length > 0)
        throw new Error("Error initializing push protocol");

      dispatch(setPushSign(user));

      return user;
    } catch (error) {
      toast.error("Request Rejected");
      throw new Error("Error initializing push protocol");
    }
  };

  const handleChatEvent = (user, data) => {
    if (data.event.includes("message")) {
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
      setIncomingCallerAddress(data.peerInfo.address);
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.APPROVE) {
      console.log("Video Call Approved");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.DENY) {
      alert("User Denied the Call");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.CONNECT) {
      console.log("Video Call Connected");
    }

    if (data.event === CONSTANTS.VIDEO.EVENT.DISCONNECT) {
      alert("Video Call ended!");
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

    stream.on(CONSTANTS.STREAM.CONNECT, () => {
      setIsPushStreamConnected(true);
      console.log("Stream Connected");
    });

    stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
      setIsPushStreamConnected(false);
      console.log("Stream Disconnected");
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

    console.log("Video Call: ", videoCall.current);

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
