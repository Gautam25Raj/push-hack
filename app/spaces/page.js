"use client";

import { useState } from "react";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

import { ethers } from "ethers";

const Spaces = () => {
  const [userAlice, setUserAlice] = useState(null);

  const initializeUser = async () => {
    const signer = ethers.Wallet.createRandom();

    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    console.log(userAlice);
    setUserAlice(userAlice);
  };

  const initializeSpace = async () => {
    const response = await userAlice.space.create("check", {
      spaceName: "check spaces",
      spaceDescription: "boring_emerald_gamefowl",
      description: "hello",
      participants: {
        listeners: [
          "0x9e60c47edF21fa5e5Af33347680B3971F2FfD464",
          "0x3829E53A15856d1846e1b52d3Bdf5839705c29e5",
        ],
        speakers: ["0x3829E53A15856d1846e1b52d3Bdf5839705c29e5"],
      },
      isPublic: true,
      account: "0xD993eb61B8843439A23741C0A3b5138763aE11a4",
      env: "staging",
      pgpPrivateKey: userAlice.chat.decryptedPgpPvtKey,
      schedule: {
        start: new Date(Date.now() + 24 * 60 * 60 * 1000),
        end: Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
      },
    });

    console.log(response);
  };

  return (
    <div className="flex flex-col">
      <button onClick={initializeUser}>Initialize User</button>
      <button onClick={initializeSpace}>Initialize Space</button>
    </div>
  );
};

export default Spaces;
