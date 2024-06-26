import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function POST(
    request:Request,
){

    try{
        const currentUser=await getCurrentUser();
        const body=await request.json();

        const {
            message,
            conversationId
        }=body;

        if(!currentUser?.id ){
            return new NextResponse('Unauthorized',{status:401});

        }

        const newMessage= await prisma.message.create({
            data:{
                messageText:message,
                conversation:{
                    connect:{
                        id:conversationId,
                    }
                },
                sender:{
                    connect:{
                        id:currentUser.id
                    }
                }
            },
            include:{
                sender:true,
            }
        });

        const updatedConversation=await prisma.conversation.update({
            where:{
                id:conversationId
            },
            data:{
                messages:{
                    connect:{
                        id:newMessage.id
                    }
                }
            },

            include:{
                messages:true,

            }
        });

        return NextResponse.json(newMessage);
    }catch(error:any){
        console.log(error,'ERROR_MESSAGES');
        return new NextResponse('InternalError',{status:500})
    }
}