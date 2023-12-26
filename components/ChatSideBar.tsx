"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, MessageCircle, PlusCircle, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import SubscriptionButton from "./SubscriptionButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};


const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = React.useState(false);

  
    return (
      <div className="flex flex-col h-full text-gray-200 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
      <Link href="/">
        <div className="w-full bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r p-2 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-white flex-wrap">
            <Home className="w-6 h-6" /> {/* Adjust the size of the Home icon */}
            <h1 className="text-lg font-bold pl-2">Home   </h1> {/* Add left padding to the text */}
          </div>
        </div>
      </Link>
  
        <div className="flex max-h-screen pb-20 flex-col mt-1 overflow-y-auto">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                  "bg-blue-600 text-white": chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                })}
              >
                <MessageCircle className="mr-2" />
                <p className="text-sm">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
    );
  };
export default ChatSideBar;
