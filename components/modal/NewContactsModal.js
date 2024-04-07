"use client";

import { Button, Card, Input, Typography } from "@material-tailwind/react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { toggleNewContactsModal } from "@/redux/slice/modalSlice";

const NewContactsModal = () => {
  const dispatch = useDispatch();

  const [recipent, setRecipent] = useState("");
  const pushSign = useSelector((state) => state.push.pushSign);
  const open = useSelector((state) => state.modals.isNewContactsModalOpen);

  const handleClose = () => {
    dispatch(toggleNewContactsModal());
  };

  const handleRequest = async () => {
    await pushSign.chat.send(recipent, {
      type: "Text",
      content: "Contact Request",
    });
  };

  return (
    open && (
      <div className="absolute top-0 left-0 h-full w-full backdrop-filter backdrop-blur-md z-50 bg-black/10">
        <div className=" flex justify-center h-full items-center ">
          <div className="w-[520px] flex items-center justify-center shadow-lg">
            <div className="w-full rounded-lg p-[0.5px] border border-gray-400">
              <div className={"h-full w-full rounded-lg bg-white "}>
                <Card
                  className={
                    "h-full w-full rounded-lg bg-white p-5 flex items-center"
                  }
                >
                  <div className="flex justify-between w-full">
                    <p className="text-2xl font-bold">Add Contact</p>

                    <Button
                      className="p-2 hover:bg-gray-200 bg-transparent shadow-none flex items-center justify-center"
                      onClick={handleClose}
                    >
                      <Plus size={20} className="rotate-45" color="black" />
                    </Button>
                  </div>

                  <div className="mt-5 w-full">
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Recipient Address
                    </Typography>

                    <Input
                      size="lg"
                      value={recipent}
                      onChange={(e) => setRecipent(e.target.value)}
                      placeholder="0x9a4jRapt...oPsr"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />

                    <Button fullWidth className="mt-5" onClick={handleRequest}>
                      Add Contact
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NewContactsModal;
