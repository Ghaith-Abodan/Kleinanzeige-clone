
import { useCallback, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { Features } from "@prisma/client";
import { Control, Controller, FieldErrors, FieldValues, useForm } from "react-hook-form";



interface FeaturesInputProps{
    id:string;
    label:string;
    data?:Features[];
    onChange:(value:any)=>void;

}

const FeaturesInput=({
    id,
    label,
    data,
    onChange,
  
}:FeaturesInputProps)=>{
   
    const [open,setOpen]=useState(false);
    const [field,setField]=useState('');
    const values=data?.find((item)=>item.id===id);
    
  
    
    

 
return(

 <div className="w-full flex justify-between items-center">
    <label>
        {label}
    </label>
 
     <Popover  open={open} onOpenChange={setOpen}>
       <PopoverTrigger  asChild  className={`
        border-2
        ${field?'border-neutral-300':'border-green-500'}`}>
        <Button
        variant='outline'
        role="combobox"
        aria-expanded={open}
        className={cn(
            "w-[250px] justify-between",
            !field && 'text-muted-foreground'
        )}    
        >
          {
         field
          ? values?.value.find((item)=>item === field)
          : "Select Value"
          }  
       
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />   
        </Button>
        
        </PopoverTrigger> 
          <PopoverContent className="w-[250px] max-h-[30vh] overflow-auto p-0">
            <Command >
                <CommandList>
                <CommandInput  placeholder="Search..."/>
                <CommandEmpty>No found.</CommandEmpty>
                <CommandGroup >
                    {values?.value.map((item)=>(
                        <CommandItem className="p-2 "
                          key={item}
                          value={item}
                          
                          onSelect={()=>{
                          
                           setOpen(false);
                          setField(item)
                          onChange({name:label, value:item})
                           
                           }} >
                         <Check className={cn("mr-2 h-4 w-4 ",item=== field ?'opacity-100':'opacity-0')}/>           
                   
                        {item}
                       
                        </CommandItem>
                         
                    ))}
                </CommandGroup>
                </CommandList>
               
                
            </Command>
            
            </PopoverContent>  

     </Popover>
    
     
    


    
    

 </div>
  
)
}

export default FeaturesInput