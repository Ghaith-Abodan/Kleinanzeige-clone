
import  prisma  from '@/libs/prismadb';

export default async function getTotalListing(
  
){
   
        const listingCount=await prisma.listing.count({})
        ;

        
        return listingCount;

   
}