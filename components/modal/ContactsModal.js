"use client";

import { Button, Card } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import {
  toggleContactsModal,
  toggleNewContactsModal,
} from "@/redux/slice/modalSlice";
import { setCurrentContact } from "@/redux/slice/PushSlice";

const ContactsModal = ({ setRecipientPubKey }) => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.push.currentContact);
  const pushSign = useSelector((state) => state.push.pushSign);
  const open = useSelector((state) => state.modals.isContactsModal);

  const handleClose = () => {
    dispatch(toggleContactsModal());
  };

  return (
    open && (
      <div className="absolute top-0 left-0 h-full w-full backdrop-filter backdrop-blur-md z-50 bg-black/10 max-h-screen">
        <div className="flex justify-center h-full items-center ">
          <div className="w-[520px] flex items-center justify-center shadow-lg">
            <div className="w-full rounded-lg p-[0.5px] border border-gray-400">
              <div className={"h-full w-full rounded-lg bg-white "}>
                <Card
                  className={
                    "h-full w-full rounded-lg bg-white p-5 flex items-center"
                  }
                >
                  <div className="flex justify-between w-full">
                    <p className="text-2xl font-bold">Contacts</p>

                    <Button
                      className="p-2 hover:bg-gray-200 bg-transparent shadow-none flex items-center justify-center"
                      onClick={handleClose}
                    >
                      <Plus size={20} className="rotate-45" color="black" />
                    </Button>
                  </div>

                  <div className="mt-5 w-full flex flex-col flex-grow overflow-scroll">
                    <Button
                      fullWidth
                      className="mb-5"
                      onClick={() => {
                        dispatch(toggleNewContactsModal());
                      }}
                    >
                      Add new Contacts
                    </Button>

                    {contacts.map((contact) => (
                      <div
                        className="flex items-center justify-between p-2 border-b border-gray-200 space-x-4"
                        key={contact.did}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <img
                            src={contact.profilePicture}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <p className="text-clip overflow-hidden">
                            {contact.name ||
                              `${contact.did
                                .split(":")[1]
                                .substring(0, 10)}...${contact.did
                                .split(":")[1]
                                .slice(-6)}`}
                          </p>
                        </div>

                        <Button
                          className="p-2"
                          onClick={() => {
                            setRecipientPubKey(contact.did.split(":")[1]);
                            handleClose();
                          }}
                        >
                          Select
                        </Button>
                      </div>
                    ))}
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

export default ContactsModal;
