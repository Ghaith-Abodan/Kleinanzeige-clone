
import  prisma  from '@/libs/prismadb';





export default async function getAllGategories(){
    try{
       

        const gateogries=await prisma.category.findMany({});

        if(!gateogries){
            return [];
        }

        return gateogries;

    }catch(error:any){
        return null;
    }
}