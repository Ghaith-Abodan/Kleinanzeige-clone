import CategoryClient from "./components/CategoryClient";
import  prisma  from '@/libs/prismadb';
import { CategoryColumn } from "./components/Columns";
import { format } from "date-fns";

export default async function CategoriesPage() {

    const categories=await prisma.category.findMany({
      orderBy:{
        createdAt:'desc'
      }
    })

    const formatedCategories:CategoryColumn[]=categories.map((item)=>({
      id:item.id,
      label:item.name,
      createdAt:format(item.createdAt,"MMMM do,yyyy")

    }))
    return (
      <>
     
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          
          <CategoryClient data={formatedCategories}/>

        </div>
      </div>
      
      </>
    )
}