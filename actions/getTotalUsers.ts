
import  prisma  from '@/libs/prismadb';

export default async function getTotalUsers(
  
){
   
        const usersCount=await prisma.user.count({})
        ;

        
        return usersCount;

   
}