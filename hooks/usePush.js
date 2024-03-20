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
        env: CONSTANTS.ENV.STAGING,
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

  const connectStreamChat = async (user) => {
    const stream = await user.initStream(
      [
        CONSTANTS.STREAM.CHAT,
        CONSTANTS.STREAM.CHAT_OPS,
        CONSTANTS.STREAM.NOTIF,
        CONSTANTS.STREAM.CONNECT,
        CONSTANTS.STREAM.DISCONNECT,
      ],
      {}
    );

    stream.on(CONSTANTS.STREAM.CONNECT, () => {
      console.log("CONNECTED");
    });

    stream.on(CONSTANTS.STREAM.CHAT, async (data) => {
      data.event.includes("message")
        ? dispatch(
            updateMessages({
              fromDID: data.from,
              timestamp: data.timestamp,
              messageContent: data.message.content,
              messageType: data.message.type,
            })
          )
        : data.event.includes("request")
        ? user.chat.list("REQUESTS").then((requests) => {
            const filterRecentRequest = requests.map((request) => ({
              profilePicture: request.profilePicture,
              did: request.did,
              msg: request.msg.messageContent,
              name: request.name,
              about: request.about,
            }));

            dispatch(setRecentRequest(filterRecentRequest));
          })
        : data.event.includes("accept")
        ? user.chat.list("CHATS").then((chats) => {
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
          })
        : toast.error("Error in chat event");
    });

    stream.on(CONSTANTS.STREAM.CHAT_OPS, (data) => {
      console.log("CHAT_OPS", data);
    });

    stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
      console.log("NOTIF", data);
    });

    await stream.connect();

    stream.on(CONSTANTS.STREAM.DISCONNECT, () => {});
  };

  return {
    initializePush,
    connectStreamChat,
  };
}
