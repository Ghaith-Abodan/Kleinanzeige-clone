"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"
import {  useRouter } from "next/navigation"

import { DataTable } from "@/components/ui/data-table"
import { CategoryColumn, Columns } from "./Columns"
import useCategoryModal from "@/hooks/useCreateModal"
import useCreateModal from "@/hooks/useCreateModal"


interface CategoryClientProps{
    data:CategoryColumn[];
}
const CategoryClient = ({
    data
}:CategoryClientProps) => {

    const createModal=useCreateModal();
   

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
       title={`Categories (${data.length})`} 
       subtitle="Manage Categories for your App " />
        <Button onClick={createModal.onOpen}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
    </Button>
    </div>
    <hr/>
    <DataTable searchKey="label" columns={Columns} data={data}/>
    </>

   
  )
}

export default CategoryClient
