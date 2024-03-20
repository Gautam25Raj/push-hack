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
      spaceName: "igo_warbler",
      spaceDescription: "boring_emerald",
      participants: {
        listeners: ["0x996A5ed069A393F0b25A08f3212F619D801bA110"],
      },
      spaceImage:
        "https://github.com/Gautam25Raj/push-chat/blob/master/screenshots/onboarding_page.PNG",
      schedule: {
        start: new Date("2024-07-15T14:48:00.000Z"),
        end: new Date("2024-07-15T15:48:00.000Z"),
      },
      speakers: ["0x3829E53A15856d1846e1b52d3Bdf5839705c29e5"],
      isPublic: true,
      account: "0xD993eb61B8843439A23741C0A3b5138763aE11a4",
      env: "staging",
      pgpPrivateKey: userAlice.decryptedPgpPvtKey,
      scheduleAt: new Date("2024-07-15T14:48:00.000Z"),
      scheduleEnd: new Date("2024-07-15T15:48:00.000Z"),
      timestamp: new Date(),
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
