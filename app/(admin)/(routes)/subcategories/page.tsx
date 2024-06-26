
import  prisma  from '@/libs/prismadb';
import { SubcategoryColumn } from "./components/Columns";
import { format } from "date-fns";
import SubcategoryClient from "./components/SubcategoryClient";

export default async function SubcategoriesPage() {

    const subCategories=await prisma.subCategory.findMany({
      orderBy:{
        createdAt:'desc'
      },
    
      include:{
        category:true,
      }
    })

    const formatedSubCategories:SubcategoryColumn[]=subCategories.map((item)=>({
      id:item.id,
      label:item.name,
      category:item.category.name,
      createdAt:format(item.createdAt,"MMMM do,yyyy")

    }))
    return (
      <>
     
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          
          <SubcategoryClient data={formatedSubCategories}/>

        </div>
      </div>
      
      </>
    )
}