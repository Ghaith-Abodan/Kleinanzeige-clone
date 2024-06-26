import  prisma  from '@/libs/prismadb';
import { NextResponse } from 'next/server';


export async function GET(
    request: Request,  {params}:{params:{messageId:string}}
) {
  try {
   

  
  
    const messages = await prisma.message.findMany({
        where: {
          conversationID: params.messageId
        },
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: 'asc'
        }
      });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return new NextResponse("Internal error", { status: 500 });
  }
};

