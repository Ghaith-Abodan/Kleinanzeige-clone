"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./CellAction"


export type SubcategoryColumn = {
  id: string;
  label: string;
  category:string;
  createdAt: string;
}

export const Columns: ColumnDef<SubcategoryColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "category",
    header: "Category",
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
