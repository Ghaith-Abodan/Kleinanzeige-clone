"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./CellAction"
import { CellFormating } from "./CellFormating";


export type FeaturesColumn = {
  id: string;
  label: string;
  values:string[];
  createdAt: string;
}

export const Columns: ColumnDef<FeaturesColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
   
  },
  {
    accessorKey: "values",
    header: "Values",
     cell:({row})=> <CellFormating data={row.original}/>
    
       
   
    
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:"actions",
    cell:({row})=><CellAction data={row.original}/>
  }
  
]
