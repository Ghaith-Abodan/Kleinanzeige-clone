'use client';

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, Listing } from "@prisma/client";
import Avatar from '@/components/Avatar';
import useConversationsModal from '@/hooks/useConversationsModal';
import useMessagesModal from '@/hooks/useMessagesModal';


interface HeaderProps {
  conversation: any;
 
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const conversationModal=useConversationsModal();
  const messagesModal=useMessagesModal();
  return (
  
    <div 
      className="
       
        bg-white 
      
        flex 
        border-b-[1px] 
        py-3 
        justify-between 
        items-center 
        shadow-sm
      "
    >
      <div className="flex gap-3 items-center">
      <div
          onClick={()=>{
            messagesModal.onClose();
            conversationModal.onOpen();
          }} 
          className="
            text-green-500 
            hover:text-green-600 
            transition 
            cursor-pointer
          "
        >
           <HiChevronLeft size={32} />
          </div>
       
          <Avatar imageSrc={conversation.listing.imagesSrc[0]} />
        
        <div className="flex flex-col">
          <div className="text-xl">{conversation.listing.title}</div>
          <div className="text-sm font-light text-neutral-500">
            {conversation.listing.city}, {conversation.listing.area}-{conversation.listing.postcode}
          </div>
        </div>
      </div>
      
    </div>
    
  );
}
 
export default Header;