"use client";

import React from "react";
import { toast } from "sonner";
import { useConnect } from "wagmi";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import usePush from "@/hooks/usePush";

import DefaultButton from "./DefaultButton";

const ConnectWalletBtn = () => {
  const activeWallet = useSelector((state) => state.modals.activeWallet);

  const { connect, connectors } = useConnect();

  const handleClick = () => {
    connect({
      connector: connectors[activeWallet === "MetaMask" ? 0 : 1],
    });
  };

  return (
    <DefaultButton
      color="gray"
      variant={"filled"}
      onClick={handleClick}
      label="Connect Wallet"
      style="bg-black w-full text-sm sm:text-sm md:text-base font-medium text-white"
    />
  );
};

const SignWalletBtn = () => {
  const router = useRouter();
  const query = useSearchParams();

  const { initializePush } = usePush();

  const handleClick = async () => {
    try {
      await initializePush();

      router.push(query.get("next") || "/home");
    } catch (err) {
      toast.error("Error initializing push protocol");
    }
  };

  return (
    <DefaultButton
      variant="filled"
      color="gray"
      label="Initialize Push"
      style="bg-black w-3/4 text-sm sm:text-sm md:text-base font-medium text-white"
      onClick={handleClick}
    />
  );
};

export { ConnectWalletBtn, SignWalletBtn, DefaultButton };
