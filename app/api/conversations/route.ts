import { NextResponse } from "next/server";


import prisma from "@/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    message,
    currentUser,
    userId,
    listingId
   } = body;

 

   const existingConversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        { OR: [{ senderId: userId, receiverId: currentUser }, { senderId: currentUser, receiverId: userId }] },
        { listingId: listingId },
      ],
    },
  });


  if(!existingConversation){

    const newConversation= await prisma.conversation.create({
      data:{
        senderId: currentUser,
        receiverId:userId,
        listingId:listingId
      }
    });
     const newMessage=await prisma.message.create({
      data:{
        conversationID:newConversation.id,
        senderID:currentUser,
        messageText:message
      },
      include:{
        conversation:true,
        sender:true,
      }
     });

     return NextResponse.json(newMessage);
  }

  const newMessage=await prisma.message.create({
    data:{
      conversationID:existingConversation.id,
      senderID:currentUser,
      messageText:message
    },
    include:{
      conversation:true,
      sender:true,
    }
  });

   return NextResponse.json(newMessage);
  
}

