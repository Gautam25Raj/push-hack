"use client";

import React from "react";
import { ConnectWalletBtn } from "@/components/ui/buttons/OnBoardButtons";

const ConnectSignBtn = ({ name }) => {
  return (
    <div className="space-y-2 px-5 text-center font-normal">
      <p className="px-4">Please connect your {name} to continue.</p>

      <ConnectWalletBtn />
    </div>
  );
};

export default ConnectSignBtn;
