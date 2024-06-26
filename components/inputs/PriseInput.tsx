"use client"

import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

import { Categories, Features } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { useState } from "react";

const PriceType=[
    {
    id:'1',
    name:'Fixedprice'
},
{
    id:'2',
    name:'VB'
},
{
    id:'3',
    name:'To give away'
},
]
interface ComboInputProps{
    id:string
    placeHolder: string;
    disabled?:boolean;
    required?:boolean;
    control:Control<FieldValues>,
    errors:FieldErrors;
}
const PriceInput = ({
    id,  
    placeHolder,
    disabled, 
    control,
    required,
    errors, 


  
}:ComboInputProps) => {

    const [open,setOpen]=useState(false);
   
  
  return (
    <Controller
    render={({field})=>(
     <Popover  open={open} onOpenChange={setOpen}>
       <PopoverTrigger  asChild disabled={disabled} className={`
        border-2
        ${errors[id]
        ?'border-green-500 focus:border-green-500'
        :'border-neutral-300'}`}>
        <Button
        variant='outline'
        role="combobox"
        aria-expanded={open}
        className={cn(
            "w-[250px] justify-between",
            !field.value && 'text-muted-foreground'
        )}    
        >
          {
          field.value
          ? field.value
          : placeHolder
          }  
       
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />   
        </Button>
        
        </PopoverTrigger> 
          <PopoverContent className="w-[250px] max-h-[30vh] overflow-auto p-0">
            <Command>
                <CommandList>
                <CommandInput  placeholder="Search..."/>
                <CommandEmpty>No found.</CommandEmpty>
                <CommandGroup>
                    {PriceType?.map((item)=>(
                        <CommandItem className="p-2 "
                          key={item.id}
                          value={item.name}
                          
                           onSelect={()=>{
                           setOpen(false);
                           field.onChange(item.name)
                      
                           }} >
                         <Check className={cn("mr-2 h-4 w-4 ",item.id === field.value ?'opacity-100':'opacity-0')}/>           
                   
                        {item.name}
                       
                        </CommandItem>
                         
                    ))}
                </CommandGroup>
                </CommandList>
               
                
            </Command>
            
            </PopoverContent>  

     </Popover>
    
     
    

    )}
    control={control}
    name='fixedPrice'
    rules={{required: required}}   
    
    />

  )
}

export default PriceInput
