
import  prisma  from '@/libs/prismadb';

import { format } from "date-fns";
import { FeaturesColumn } from './components/Columns';
import FeaturesClient from './components/FeaturesClient';


export default async function FeaturesPage() {

    const features=await prisma.featur.findMany({
      orderBy:{
        createdAt:'desc'
      },
    

    })

    const formatedFeatures:FeaturesColumn[]=features.map((item)=>({
      id:item.id,
      label:item.name,
      values:item.value,
      createdAt:format(item.createdAt,"MMMM do,yyyy")

    }))
    return (
      <>
     
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          
          <FeaturesClient data={formatedFeatures}/>

        </div>
      </div>
      
      </>
    )
}