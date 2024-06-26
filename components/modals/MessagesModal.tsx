"use client"


import EmptyState from "@/components/EmptyState";
import Body from "@/components/modals/components/Body";
import Form from "@/components/modals/components/Form";
import Header from "@/components/modals/components/Header";
import useMessagesModal from "@/hooks/useMessagesModal";
import { User } from "@prisma/client";

import Modal from "./Modal";


interface MessagesModalProps{
  currentUser:User | null;
}


const MessagesModal = ({
  currentUser
}:MessagesModalProps) => {


  

  const message=useMessagesModal();
 
    let bodyConent=(
      <div className="h-full">
        <div className="h-full flex flex-col">
          <EmptyState
           title="No messages founded"
          />
        </div>
      </div>
    )
    
  if(message.conversationData){
  
    bodyConent=(
      
      <div className="flex flex-col gap-8 h-[60vh]">
   
     <Header conversation={message.conversationData} />

      <Body
    
      messages={message.conversationData.messages}
      currentUser={currentUser}     />
     
    
     
       
       
      </div>
  
    )

  }
  let footer;
  if(message.conversationData){
 footer=(
    <Form conversationId={message.conversationData.id}/>
   )
  }
  return ( 
 
<Modal

isOpen={message.isOpen}
onClose={message.onClose}
onSubmit={message.onClose}
body={bodyConent}
footer={footer}

/>
  );
}

export default MessagesModal;