"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"


import { DataTable } from "@/components/ui/data-table"
import { SubcategoryColumn, Columns } from "./Columns"

import useCreateModal from "@/hooks/useCreateModal"


interface SubcategoryClientProps{
    data:SubcategoryColumn[];
}
const SubcategoryClient = ({
    data
}:SubcategoryClientProps) => {


    const CreateModal=useCreateModal();
   

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
       title={`SubCategories (${data.length})`} 
       subtitle="Manage SubCategories for your App " />
        <Button onClick={CreateModal.subOpen}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
    </Button>
    </div>
    <hr/>
    <DataTable searchKey="label" columns={Columns} data={data}/>
    </>

   
  )
}

export default SubcategoryClient
