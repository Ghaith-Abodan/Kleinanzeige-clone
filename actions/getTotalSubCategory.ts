
import  prisma  from '@/libs/prismadb';

export default async function getTotalSubCategory(
  
){
   
        const subCategoryCount=await prisma.subCategory.count({})
        ;

        
        return subCategoryCount;

   
}