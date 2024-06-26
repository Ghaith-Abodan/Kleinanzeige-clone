"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"


import { DataTable } from "@/components/ui/data-table"
import { UserColumn, Columns } from "./Columns"

import useCreateModal from "@/hooks/useCreateModal"


interface UserClientProps{
    data:UserColumn[];
}
const CategoryClient = ({
    data
}:UserClientProps) => {

    const createModal=useCreateModal();
   

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
       title={`Users (${data.length})`} 
       subtitle="Manage Users for your App " />
        <Button onClick={createModal.userOpen}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
    </Button>
    </div>
    <hr/>
    <DataTable searchKey="name" columns={Columns} data={data}/>
    </>

   
  )
}

export default CategoryClient
