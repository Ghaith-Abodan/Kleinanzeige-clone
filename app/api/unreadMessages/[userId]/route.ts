import  prisma  from '@/libs/prismadb';
import { NextResponse } from 'next/server';



export async function GET(
    request: Request,  {params}:{params:{userId:string}}
) {
  try {
   

  
  
    const unreadMessageCount = await prisma.conversation.count({
      where: {
       
        OR:[{receiverId: params.userId },{ senderId: params.userId}],
        messages:{
            
            some:{
                isRead:false,
                NOT:{senderID:params.userId},
            },
            
        },
      
        
        
      
    }
     
    });
  
 
   
    return NextResponse.json({count:unreadMessageCount});
   
    
  } catch (error: any) {
    console.log('Error fetching unread message count:', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
    request: Request,  {params}:{params:{userId:string}}
) {
  try {
   

  
  
    const conversations = await prisma.message.updateMany({
      where: {
        AND: [
            {conversation:{
                OR:[{receiverId: params.userId },{ senderId: params.userId}] 
               
            }},
            { senderID: {
                not:params.userId,
            } },
           { isRead:false},
          ],
       
        
          
        },

    data:{
       isRead:true, 
    }
   
    });
  
   
   
    return NextResponse.json({success:true});
   
    
  } catch (error: any) {
    console.log('Error marking messages as read:', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};