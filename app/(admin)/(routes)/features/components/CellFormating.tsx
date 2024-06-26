"use client"


import { Button } from "@/components/ui/button";
import {FeaturesColumn } from "./Columns"


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {  Check, ChevronDown, MoreHorizontal } from "lucide-react";


import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";


interface CellFormatingProps{
data:FeaturesColumn;
}

export const CellFormating=({
    data
}:CellFormatingProps)=>{
    const [open,setOpen]=useState(false);
   
    return(
        <Popover  open={open} onOpenChange={setOpen}>
        <PopoverTrigger  asChild  className={`
         border-2
        border-neutral-300`}>
         <Button
         variant='outline'
         role="combobox"
         aria-expanded={open}
         className="w-[150px] justify-between p-2"
           
         >
          show the values
         <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />   
         </Button>
         
         </PopoverTrigger> 
           <PopoverContent className="w-[150px] max-h-[20vh] overflow-auto p-0">
             <Command>
                 <CommandList>
                 <CommandInput  placeholder="Search..."/>
                 <CommandEmpty>No found.</CommandEmpty>
                 <CommandGroup>
                     {data.values.map((item)=>(
                         <CommandItem className="p-2 "
                           key={item}
                           value={item}
                            onSelect={()=>{
                            setOpen(false);
                         
                            }} >
                                   
                    
                         {item}
                        
                         </CommandItem>
                          
                     ))}
                 </CommandGroup>
                 </CommandList>
                
                 
             </Command>
             
             </PopoverContent>  
 
      </Popover>
           
            )
}

