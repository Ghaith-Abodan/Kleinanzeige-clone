"use client"


import { Button } from "@/components/ui/button";
import {SubcategoryColumn } from "./Columns"


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import toast from "react-hot-toast";

import useCategoryEditModal from "@/hooks/useUpdateModal";
import useCategoryRemoveModal from "@/hooks/useRemoveModal";
import useRemoveModal from "@/hooks/useRemoveModal";
import useUpdateModal from "@/hooks/useUpdateModal";


interface CellActionProps{
data:SubcategoryColumn;
}

export const CellAction=({
    data
}:CellActionProps)=>{

const removeModal=useRemoveModal();
const updateModal=useUpdateModal();

const onCopy=(id:string)=>{
   navigator.clipboard.writeText(id);
   toast.success('Category Id copied to the clipboard.') 
}
    return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                   <DropdownMenuLabel>
                     Actions
                    </DropdownMenuLabel> 
                    <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                      <Copy className="mr-2 h-4 w-4"/>
                      Copy Id  
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>updateModal.onSubCategory(data.id)}>
                      <Edit className="mr-2 h-4 w-4"/>
                      Update 
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>removeModal.onSubCategory(data.id)}>
                      <Trash className="mr-2 h-4 w-4"/>
                      Delete 
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            )
}

