'use client';

import useConversation from "@/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { User } from "@prisma/client";





interface BodyProps{
  messages:any[];

  currentUser:User | null;
}

const Body= ({
  messages,
 
  currentUser
} :BodyProps) => {
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    bottomRef?.current?.scrollIntoView();
  },[])
  return ( 
    <div className=" flex-1 overflow-y-auto">
      {messages.map((message)=>(
        <MessageBox
       
          key={message.id}
          messages={message}
         
          currentUser={currentUser}
        />
      ))}
     <div className="pt-5 scroll-smooth transition  " ref={bottomRef} />
    
    </div>
  );
}
 
export default Body;