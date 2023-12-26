import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }
  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  return (
    <div className="flex h-screen">
      {/* chat sidebar */}
      <div className="flex"> {/* Adjust the flex ratio here */}
        <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
      </div>
      {/* pdf viewer */}
      <div className="flex-1"> {/* Adjust the flex ratio here */}
        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
      </div>
      {/* chat component */}
      <div className="flex-1"> {/* Adjust the flex ratio here */}
        Chat Component
      </div>
    </div>
  );
};
export default ChatPage;
