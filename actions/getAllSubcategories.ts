
import  prisma  from '@/libs/prismadb';





export default async function getAllSubcategories(){
    try{
       

        const subGateogries=await prisma.subCategory.findMany({});

        if(!subGateogries){
            return [];
        }

        return subGateogries;

    }catch(error:any){
        return null;
    }
}