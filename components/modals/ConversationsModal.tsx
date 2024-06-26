"use client"



import {  useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import { useRouter } from 'next/navigation';
import {  User } from '@prisma/client';
import useConversationsModal from '@/hooks/useConversationsModal';

import Avatar from '../Avatar';

import useMessagesModal from '@/hooks/useMessagesModal';
import axios from 'axios';

interface ConversationsModalProps{
  conversations:any[] | null;
  currentUser:User | null;    
}

const ConversationsModal = ({
  conversations,
  currentUser
}:ConversationsModalProps) => {
 

  const conversationsModal=useConversationsModal();
  const [isLoading,setIsLoading]=useState(false);
  const messagesModal=useMessagesModal();
  
 
    
        const bodyContent = (
          <div className="flex flex-col gap-4">
            {conversations?.length===0 &&
              <Heading
              title="No Conversations"
              subtitle="It seem like you have no conversations"
              center
            />
            
            }
            <Heading
              title={`You have ${conversations?.length} conversation`}
              subtitle="Click to one Conversation to show all messages"
              center
            />
           
            {
              conversations?.map((conversation)=>(
                <div key={conversation.id}
                onClick={async()=>{
                  conversationsModal.onClose();
                  const conversationData= await axios.get(`/api/conversations/${conversation.id}`)
                  const messagesData=  await axios.get(`/api/messages/${conversation.id}`)
                  if(conversationData && messagesData) {
                  
                  messagesModal.onOpen(conversationData.data);
                  }
                  }}
                className='
                w-full 
                relative 
                flex 
                items-center 
                space-x-3 
                bg-white 
                p-3 
                hover:bg-neutral-100
                rounded-lg
                transition
                cursor-pointer'
                >
                
                <Avatar 
             
  
             imageSrc={conversation.senderId === currentUser?.id 
                ? conversation.receiver.image 
                : conversation.sender.image}  />
              
                <div className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <div className="flex flex-col mb-1">
              <p className="text-xl font-medium text-gray-900">
                {conversation.senderId === currentUser?.id ? conversation.receiver.name : conversation.sender.name}
              </p>
              <p className="text-sm font-medium text-neutral-400">
                {conversation.messages[conversation.messages.length - 1].messageText}
              </p>
            </div>
          </div>
 
                </div>
              ))
              }

          
           
           
          </div>
        )
     
      
      

  return (
    <Modal
    disabled={isLoading}
    isOpen={conversationsModal.isOpen}
    title='Your conversations'
    actionLabel='Close'
    onClose={conversationsModal.onClose}
    onSubmit={conversationsModal.onClose}
    body={bodyContent}
    
  
    />
  )
}

export default ConversationsModal
