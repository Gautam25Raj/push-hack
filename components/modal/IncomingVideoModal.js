"use client";

import {
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";

const IncomingVideoModal = ({ callerID, onAccept, onReject }) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full backdrop-filter backdrop-blur-md z-50 bg-black/10">
      <div className=" flex justify-center h-full items-center ">
        <div className="w-[520px] flex items-center justify-center shadow-lg">
          <div className="w-full rounded-lg p-[0.5px] border border-gray-400">
            <div className={"h-full w-full rounded-lg bg-white "}>
              <Card className={"h-full w-full rounded-lg bg-white pb-1"}>
                <DialogHeader>Incomming Meeting Call.</DialogHeader>
                <DialogBody>{callerID} is calling...</DialogBody>

                <DialogFooter className="gap-2 ml-auto">
                  <Button
                    color="gray"
                    className="bg-green-500"
                    onClick={onAccept}
                  >
                    <span>Accept</span>
                  </Button>

                  <Button
                    variant="outlined"
                    color="red"
                    onClick={onReject}
                    className="mr-1"
                  >
                    <span>Reject</span>
                  </Button>
                </DialogFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingVideoModal;
