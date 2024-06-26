

import { Control, Controller, FieldErrors, FieldValues, } from "react-hook-form";

import { Switch } from "../ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";


interface MultiSelectInputProps{
    id: string;
    label:string;
    placeHolder:string;
    disabled?:boolean;
    control:Control<FieldValues>,
  
   
}
const SwitchInput = ({
    id,
    label,
    placeHolder,
    disabled, 
    control,

    
}:MultiSelectInputProps) => {


  return (
    <div 
    className="w-full relative">
      
    <Controller 
  
    render={({field})=>(
     <div 
     id={id}
     className={`
     flex
     items-center
     justify-between 
     rounded-lg    
     border
     p-4 
     disabled:opacity-70
     disabled:cursor-not-allowed
     `}>
      <div className=" space-y-0.5">
      <label className="text-base" htmlFor={id}>
       {label}
        </label>
        <p className="text-sm font-medium">{placeHolder} </p>
     
        </div>  
        <Switch
        
        id={id}
        checked={field.value}
        onCheckedChange={field.onChange}
       
     
      />
      
      
         </div>
         
         )}
        
         name={id}
         control={control}
          
    
     />
   </div>

       

      
  
   
  )
     }

export default SwitchInput
