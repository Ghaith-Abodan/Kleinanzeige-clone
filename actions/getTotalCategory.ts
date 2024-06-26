
import  prisma  from '@/libs/prismadb';

export default async function getTotalCategory(
  
){
   
        const categoryCount=await prisma.category.count({})
        ;

        
        return categoryCount;

   
}