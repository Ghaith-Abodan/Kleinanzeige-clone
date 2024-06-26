
import  prisma  from '@/libs/prismadb';
import { UserColumn } from "./components/Columns";
import { format } from "date-fns";
import UserClient from "./components/UserClient";

export default async function UsresPage() {

    const users=await prisma.user.findMany({
      orderBy:{
        createdAt:'desc'
      }
    })

    const formatedUsers:UserColumn[]=users.map((item)=>({
      id:item.id,
      name:item.name,
      email:item.email,
      role:item.role,
      active:item.active,
      createdAt:format(item.createdAt,"MMMM do,yyyy")

    }))
    return (
      <>
     
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          
          <UserClient data={formatedUsers}/>

        </div>
      </div>
      
      </>
    )
}