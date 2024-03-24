"use client";

import { CONSTANTS } from "@pushprotocol/restapi";
import { useSelector } from "react-redux";

const page = () => {
  const userAlice = useSelector((state) => state.push.pushSign);

  const initializePush = async () => {
    let data = CONSTANTS.VIDEO.INITIAL_DATA;

    const setData = (fn) => {
      data = fn(data);
    };

    const stream = await userAlice.initStream([
      CONSTANTS.STREAM.CONNECT,
      CONSTANTS.STREAM.VIDEO,
      CONSTANTS.STREAM.DISCONNECT,
    ]);

    stream.on(CONSTANTS.STREAM.CONNECT, () => {
      console.log("CONNECTED");
    });

    const aliceVideoCall = await userAlice.video.initialize(setData, {
      stream: stream,
      config: {
        video: true,
        audio: true,
      },
    });

    stream.on(CONSTANTS.STREAM.VIDEO, async (data) => {
      if (data.event === CONSTANTS.STREAM.VIDEO.REQUEST) {
        aliceVideoCall.approve();
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.APPROVE) {
        console.log("Video Call Approved");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DENY) {
        console.log("User Denied the Call");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.CONNECT) {
        console.log("Video Call Connected");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DISCONNECT) {
        console.log("Video Call ended!");
      }
    });

    await stream.connect();

    stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
      console.log("DISCONNECTED");
    });

    await aliceVideoCall.request([
      "0x3f5E02760Fc81ba1db4d613Ea04BBA72Dc6C06dE",
    ]);
  };

  return <button onClick={initializePush}>hi</button>;
};

export default page;
