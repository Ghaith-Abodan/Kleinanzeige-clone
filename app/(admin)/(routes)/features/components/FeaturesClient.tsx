"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"


import { DataTable } from "@/components/ui/data-table"
import { FeaturesColumn, Columns } from "./Columns"
import useCategoryModal from "@/hooks/useCreateModal"
import useCreateModal from "@/hooks/useCreateModal"


interface FeaturesClientProps{
    data:FeaturesColumn[];
}
const FeaturesClient = ({
    data
}:FeaturesClientProps) => {


    const CreateModal=useCreateModal();
   

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
       title={`Features (${data.length})`} 
       subtitle="Manage Features for your App " />
        <Button onClick={CreateModal.featureOpen}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
    </Button>
    </div>
    <hr/>
    <DataTable searchKey="label" columns={Columns} data={data}/>
    </>

   
  )
}

export default FeaturesClient
