import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonProps{
    label:string;
    onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    disabled?:boolean;
    outline?:boolean;
    small?:boolean;
    icon?:IconType; 
    className?:string;    
}

const Button = ({
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  className,
  icon: Icon,
}:ButtonProps) => {


  return (
    <button
     disabled={disabled}
     onClick={onClick}
     className={twMerge( `
     relative
     disabled:opacity-70
     disabled:cursor-not-allowed
     rounded-lg
     hover:opacity-80
     transition
     w-full
     ${outline 
        ? 'bg-white border-black text-black' 
        : 'bg-green-500 border-white text-white'}
     ${small
        ? 'text-sm py-1 px-4 w-full font-light border-[1px]' 
        : 'text-md py-3 font-semibold border-2'}
  
     `,className)} >
        {Icon && (
            <Icon
             size={24}
             className="
              absolute
              left-4
              top-3
              
              "  />
        )}
      {label}
    </button>
  )
}

export default Button
