"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./CellAction"


export type UserColumn = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  active?: boolean;
  createdAt?: string;
}

export const Columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id:"actions",
    cell:({row})=><CellAction data={row.original}/>
  }
  
]
