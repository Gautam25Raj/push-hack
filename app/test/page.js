"use client";

// Import restapi for function calls
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

// Ethers or Viem, both are supported
import { ethers } from "ethers";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(CONSTANTS.VIDEO.INITIAL_DATA);
  const [userAlice, setUserAlice] = useState(null);
  const [stream, setStream] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [aliceVideoCall, setAliceVideoCall] = useState(null);

  const initializeUser = async () => {
    // Creating a random signer from a wallet, ideally this is the wallet you will connect
    const signer = ethers.Wallet.createRandom();

    // Initialize wallet user, use 'PROD' instead of 'STAGING' for mainnet apps
    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    setUserAlice(userAlice);

    // Initialize Stream
    const stream = await userAlice.initStream([CONSTANTS.STREAM.VIDEO]);
    console.log(stream);

    setStream(stream);

    // Configure stream listen events and what to do
    stream.on(CONSTANTS.STREAM.VIDEO, (data) => {
      if (data.event === CONSTANTS.STREAM.VIDEO.REQUEST) {
        console.log("Request received");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.APPROVE) {
        // handle call approve
        console.log("Call approved");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DENY) {
        // handle call denied
        console.log("Call denied");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.CONNECT) {
        // handle call connected
        console.log("Call connected");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DISCONNECT) {
        // handle call disconnected
        console.log("Call disconnected");
      }
    });

    // Connect Stream
    stream.connect();
  };

  const initializeVideoApi = async () => {
    // Initialising the video API
    const aliceVideoCall = await userAlice.video.initialize(setData, {
      stream: stream,
      config: {
        video: true, // to enable video on start
        audio: true, // to enable audio on start
      },
    });

    setAliceVideoCall(aliceVideoCall);

    console.log(aliceVideoCall);
  };

  const startVideoCall = async () => {
    // Start the video call
    await aliceVideoCall.request([receiver]);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={initializeUser}>connect</button>
      <button onClick={initializeVideoApi}>initialize video</button>
      <input
        type="text"
        value={receiver}
        onChange={(event) => setReceiver(event.target.value)}
        className="text-black"
      />
      <button onClick={startVideoCall}>Start Video Call</button>
    </main>
  );
}
