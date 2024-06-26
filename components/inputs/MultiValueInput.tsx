import { Control, Controller, FieldErrors, FieldValues, } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";


interface MultiValueInputProps{
    id: string;
    label:string;
    disabled?:boolean;
    required?:boolean;
    control:Control<FieldValues>,
    errors:FieldErrors
 
}
const MultiValueInput = ({
    id,
    label,
    disabled, 
    required,
    control,
    errors
}:MultiValueInputProps) => {

    
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
        <TagsInput
       
        value={field.value}
        onChange={field.onChange}
        disabled={disabled}
        placeHolder={label}
        separators={["Enter"," "]}
  
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

export default MultiValueInput
