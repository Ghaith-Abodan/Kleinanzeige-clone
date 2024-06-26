
import  prisma  from '@/libs/prismadb';





export default async function getAllFeatures(){
    try{
       

        const features=await prisma.featur.findMany({});

        if(!features){
            return [];
        }

        return features

    }catch(error:any){
        return null;
    }
}