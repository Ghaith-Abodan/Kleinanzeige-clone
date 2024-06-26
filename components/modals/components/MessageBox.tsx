'use client';

import clsx from "clsx";

import { formatDistance, subDays } from "date-fns";

import Avatar from "@/components/Avatar";
import { User } from "@prisma/client";





interface MessageBoxProps {
  messages: any;


 
  currentUser:User | null;
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  messages, 

  currentUser
}) => {
 
  const isOwn=currentUser?.id === messages.sender.id
  
  const container=clsx(
    "flex gap-3 p-4 ",
    isOwn && "justify-end"
  );
  
  const avatar=clsx(isOwn && "order-2");

  const body=clsx(
    "flex flex-col gap-2",
    isOwn && "items-end"
  )  

  const message=clsx(
    "text-sm w-fit overflow-hidden rounded-full p-3",
    isOwn ? 'bg-green-500 text-white' : 'bg-gray-100'
  )
  return ( 
    <div className={container} >
      <div className={avatar} >
        <Avatar imageSrc={messages.sender.image} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {messages.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {formatDistance(subDays(new Date(messages.createdAt), 0), new Date(),{addSuffix:true})}
          </div>
        </div>
        <div className={message} >
         
            <div>{messages.messageText}</div>
        
        </div>
      
      </div>
    </div>
   );
}
 
export default MessageBox;