import { Featur } from "@prisma/client";

import { Control, Controller, FieldErrors, FieldValues, } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";



type optionItems={
    label:string;
    value:string;
}
interface MultiSelectInputProps{
    id: string;
    label:string;
    disabled?:boolean;
    required?:boolean;
    control:Control<FieldValues>,
    errors:FieldErrors
    data:Featur[];
}
const MultiSelectInput = ({
    id,
    label,
    disabled, 
    required,
    control,
    errors,
    data
}:MultiSelectInputProps) => {


    
const options:optionItems[]=data.map((item)=>({
 label:item.name,
 value:item.id
}))

 
  
  return (
    <div 
    className="w-full relative">
    <Controller 
  
    render={({field})=>(
     <div 
     id={id}
     className={`
      
     disabled:opacity-70
     disabled:cursor-not-allowed
     ${errors[id]
      ?'border-green-500 focus:border-green-500 border-2 rounded-lg'
      :'border-neutral-300 focus:border-black border-2 rounded-lg'}
     `}>
        <MultiSelect
       
        value={field.value}
        onChange={field.onChange}

        disabled={disabled}
        labelledBy={label}
        options={options!}
  
         />
       
         </div>
         )}
        
         name="featuresIds"
         control={control}
         rules={{required: required}}   
    
     />
   </div>

       

      
  
   
  )
     }

export default MultiSelectInput
