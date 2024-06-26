
import  prisma  from '@/libs/prismadb';



export interface IListingsParams{
    userId?:string;
    category?:string;
    title?:string;
    city?:string;
    area?:string;
    postcode?:string;  
}

export default async function getListings(
    params:IListingsParams
){
    try{
       const {
        userId,
        category,
        title,
        city,
        area,
        postcode,  } = params;

       let query:any={};
       
       if(userId){
        query.userId=userId;
       }

       if(category){
        query.categoryId=category;
       }

       if(title){
        query.title=title;
       }

       if(city){
        query.city=city;

       }
       if(area){
        query.area=area;
       }
       if(postcode){
        query.postcode=postcode;
       }
        const listings=await prisma.listing.findMany({
            
            where:{
                title:{
                    contains:query.title || undefined,
                    mode:'insensitive',
                },
                categoryId: query.categoryId || undefined,
                city:query.city || undefined,
                area:query.area || undefined,
                postcode:query.postcode || undefined,

 
            },
           
            orderBy:{
                createdAt:'desc'
            },

            include:{
                category:true,
                subCategory:true,
                
            }
        });

        
        if(!listings){
            return [];
        }
        return listings;

    }catch(error:any){
        throw new Error(error);
    }
}