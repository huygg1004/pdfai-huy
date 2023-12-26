import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-8 px-4"> {/* Adjust the gap here */}
      {messages.map((message) => {
        const isUserMessage = message.role === "user";

        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": isUserMessage,
              "justify-start pr-10": !isUserMessage,
            })}
          >
            <div
              className={cn(
                "relative rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-600 text-white": isUserMessage,
                  "bg-black text-white": !isUserMessage,
                }
              )}
            >
              <p>{message.content}</p>
              {/* Circle surrounding the message */}
              <div
                className={cn(
                  "absolute -top-2 -left-2 w-6 h-6 rounded-full flex justify-center items-center",
                  {
                    "bg-black text-white": isUserMessage,
                    "bg-gray-500 text-white": !isUserMessage,
                  }
                )}
              >
                {isUserMessage ? "Me" : "AI"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
