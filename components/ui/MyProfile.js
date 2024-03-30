"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

import Copy from "./Copy";

import pubkeyMinify from "@/utils/pubkeyMinify";

const MyProfile = () => {
  const pushSign = useSelector((state) => state.push.pushSign);
  const userInfo = useSelector((state) => state.push.pushUser);

  return (
    <div className="flex gap-4 items-center">
      <div>
        <p className="font-bold">{userInfo.name}</p>
        <div className="text-sm flex gap-2 items-center">
          {pubkeyMinify(pushSign.account)}
          <Copy text={pushSign.account} />
        </div>
      </div>

      <Image
        src={userInfo.picture}
        width={48}
        height={48}
        alt=""
        className="rounded-full"
      />
    </div>
  );
};

export default MyProfile;
