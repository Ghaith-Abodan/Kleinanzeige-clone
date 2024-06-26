import  prisma  from '@/libs/prismadb';
import { NextResponse } from 'next/server';


export async function GET(
    request: Request,  {params}:{params:{conversationId:string}}
) {
  try {
   

  
  
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: params.conversationId
      },
      include: {
        listing: true,
       
        messages:{
          include:{
            sender:true
          }
        }
       
        
        
      },
    });

    return NextResponse.json(conversation);

    
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return new NextResponse("Internal error", { status: 500 });
  }
};

