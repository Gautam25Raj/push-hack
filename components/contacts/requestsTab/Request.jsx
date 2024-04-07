"use client";

import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEthersSigner } from "@/wagmi/EthersSigner";

import { setRecentRequest } from "@/redux/slice/PushSlice";

import RequestsItem from "./RequestsItem";

import { LoaderCircle } from "lucide-react";

const Requests = () => {
  const dispatch = useDispatch();
  const signer = useEthersSigner();
  const { isConnected } = useAccount();

  const [isLoading, setIsLoading] = useState(true);

  const pushSign = useSelector((state) => state.push.pushSign);
  const recentRequest = useSelector((state) => state.push.recentRequest);

  useEffect(() => {
    const initializeRequests = async () => {
      try {
        const requestsLists = await pushSign.chat.list("REQUESTS");

        const filterRecentRequest = requestsLists.map((request) => ({
          profilePicture: request.profilePicture,
          did: request.did,
          msg: request.msg.messageContent,
          name: request.name,
          about: request.about,
        }));

        dispatch(setRecentRequest(filterRecentRequest));
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching requests");
      }
    };

    if (isConnected && signer && pushSign) {
      setIsLoading(true);
      initializeRequests();
    }
  }, [isConnected, signer, pushSign, dispatch]);

  return (
    <div className="relative flex-1 h-full w-full">
      {isLoading ? (
        <p className="text-primary-white/60 z-10 absolute left-1/2 animate-spin">
          <LoaderCircle />
        </p>
      ) : recentRequest.length === 0 ? (
        <p className="text-primary-white/60 py-2 text-center bg-gray-100 rounded-lg mt-2">
          No Requests to show
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {recentRequest.map((request, index) => (
            <RequestsItem key={index} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
