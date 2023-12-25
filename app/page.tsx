import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";


export default async function Home() {
   const { userId } = await auth();
   const isAuth = !!userId;
   
   return (
      <div className="w-screen min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center text-center">
               <div className="flex items-center space-x-4">
                  <h1 className="text-5xl font-semibold text-white">PDF AI</h1>
                  <h3 className="text-xl font-semibold text-white">Analyze any PDFs</h3>
                  <UserButton afterSignOutUrl="/" />
               </div>

               <div className="mt-4">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                     Go to Chats
                  </button>
               </div>

               <div className="mt-4 max-w-xl">
                  <p className="text-lg text-white">
                     Use AI to find answers to your questions related to uploaded PDFs
                     <br />
                     "Sử dụng trí tuệ nhân tạo để tìm câu trả lời cho những câu hỏi liên quan đến tài liệu PDF bạn đã tải lên."
                  </p>
               </div>

               {/* <div className="w-full mt-4">
                  {!isAuth ? (
                     <FileUpload/>
                  ):(
                     <Link href="/sign-in">
                        <Button>
                           Login to get Started!
                           <LogIn className="w-4 h-4 ml-2" />
                        </Button>
                     </Link>
                  )}
               </div> */}

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




            </div>
         </div>
      </div>
   );
}
