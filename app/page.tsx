import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import styles from "@/Home.module.css";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className={`flex items-center space-x-4 flex-col ${styles.fadeIn}`}>
            {/* Use flex-col to arrange items vertically */}
            <h1 className={`text-5xl font-semibold text-white ${styles.fadeInSlow}`}>
              Document AI + GPT
            </h1>
            <h3 className={`text-xl font-semibold text-white ${styles.fadeInSlow}`}>
              Analyze any PDFs
            </h3>
            <br />
            <UserButton afterSignOutUrl="/" />
            <br />
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Conversations <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          {/* Added the "Developed by Huy N. Doan" text without fade-in */}

        </div>
      </div>

      <div className="text-white absolute bottom-4 left-4">
            Developed by Huy D
      </div>
      <div className="text-white absolute bottom-4 right-4">
            Powered by GPT3.5
      </div>

    </div>
    
  );
}
