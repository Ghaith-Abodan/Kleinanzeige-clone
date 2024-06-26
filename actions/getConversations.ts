import  prisma  from '@/libs/prismadb';



export default async function getConversations(
    userId?:string  
){
   
  
    try{
    

        const conversations=await prisma.conversation.findMany({
            where: {
              
                   OR: [
                    { senderId: userId}, 
                    { receiverId: userId }
                   ]
                },
                 
              
              
            orderBy: {
                createdAt: 'desc',
              },
              include:{
                messages:true,
                sender:true,
                receiver:true,
                listing: true
              }

        })

        if(!conversations){
            return null;
        }
        return conversations
    }catch(error:any){
        throw new Error(error);
    }
}