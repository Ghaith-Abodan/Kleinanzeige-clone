import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";



interface MessageInputProps{
    id: string;
    label?: string;
    disabled?:boolean;
    required?:boolean;
    register:UseFormRegister<FieldValues>,
    errors:FieldErrors
    max?:number;
}
const MessageInput = ({
    id,
    label,
    disabled, 
    register,
    required,
    errors,
    max
}:MessageInputProps) => {

  return (
    <div 
      className=" 
      w-full
      flex
      flex-col
      gap-4    
     ">
       <textarea
        id={id}
        disabled={disabled}
        {...register(id,{required,maxLength:max})}
     
       rows={7}
       placeholder={label}
       className={`
       shadow-sm
       text-sm   
       w-full
       p-4
       pt-6
       font-medium
       bg-white
       border-2
       rounded-md
       outline-none
       transition
       disabled:opacity-70
       disabled:cursor-not-allowed
       ${errors[id] && errors[id]?.type==="maxLength"
        ?'border-green-500 focus:border-green-500'
        :'border-neutral-200 focus:border-neutral-200'}
       `}
       
       />

       
    </div>
  )
}

export default MessageInput
